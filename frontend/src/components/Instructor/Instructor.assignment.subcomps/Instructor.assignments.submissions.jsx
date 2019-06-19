import React, {Component} from 'react';
import axios from 'axios';

export default class AssignmentSubmissions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Modules: [],
            Assignments: [],
            Submissions: []
        };
        this.onChangeModule = this.onChangeModule.bind(this);
        this.onChangeAssignment = this.onChangeAssignment.bind(this);

        this.populateSubmissions = this.populateSubmissions.bind(this);
        this.populateTable = this.populateTable.bind(this);
    }

    componentWillMount() {
        let id = sessionStorage.getItem('UserID');

        axios.get('http://localhost:4000/instructors/' + id).then((res) => {
            let instructor = res.data;
            this.setState({
                Modules: instructor.Modules
            })
        })
    }

    onChangeModule(e) {
        this.setState({
           Assignments:[]
        });
        this.populateSubmissions(e.target.value);
    }

    onChangeAssignment(e) {
        this.populateTable(e.target.value);
    }

    populateTable(value) {
        if (value) {
            axios.get('http://localhost:4000/assignments/getByName/' + value).then((res) => {
                let resData = res.data;
                this.setState({
                    Submissions: resData.Submissions
                });

            })
        }
    }

    populateSubmissions(value) {
        if (value) {

            axios.get('http://localhost:4000/modules/getByName/' + value).then((res) => {
                let Module_ID = res.data.ID;
                axios.get('http://localhost:4000/modules/' + Module_ID).then((response) => {
                    response.data.Assignments.forEach((element) => {
                        if (element) {
                            axios.get('http://localhost:4000/assignments/' + element).then((res) => {
                                this.setState({
                                    Assignments: this.state.Assignments.concat(res.data.Name)
                                })
                            }).catch((err) => {
                            })
                        }
                    });
                })
            });
        }
    }

    render() {
        return (

            <div>
                <h3>Assignments Submissions</h3>
                <br/>
                <form>
                    <div className="form-group row">
                        <label className="col-md-6 col-form-label">Module: </label>
                        <select id="module" onClick={this.onChangeModule}>
                            {
                                this.state.Modules.map((mod, i) => {
                                    return <option value={mod} key={i}>{mod}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-6 col-form-label">Assignment: </label>
                        <select id="assignment" onClick={this.onChangeAssignment}>
                            {
                                this.state.Assignments.map((assignment, i) => {
                                    return <option value={assignment} key={i}>{assignment}</option>
                                })
                            }
                        </select>
                        <br/>
                    </div>
                    <div className="form-group row text-light">
                        <table className="table table-hover text-light">
                            <thead>
                            <tr>
                                <td>Student</td>
                                <td>Submission Link</td>
                            </tr>
                            </thead>
                            <tbody>
                            {

                                this.state.Submissions.map((subs,i)=>(
                                    <tr>
                                        <td >{subs.Student}</td>
                                        <td >{subs.SubmissionLink}</td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                </form>
            </div>
        );
    }
}