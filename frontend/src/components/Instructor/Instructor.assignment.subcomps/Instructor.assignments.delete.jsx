import React, {Component} from 'react';
import axios from 'axios';

export default class DeleteModule extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Modules: [],
            Module: '',
            Assignment: '',
            Assignments: []
        };

        this.onChangeModule = this.onChangeModule.bind(this);
        this.onChangeAssignment = this.onChangeAssignment.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.populateAssignments = this.populateAssignments.bind(this);
    }

    onChangeAssignment(e) {
        this.setState({
            Assignment: e.target.value
        })
    }

    onChangeModule(e) {
        let module = e.target.value;
        this.setState({
            Module: module,
            Assignments: []
        });
        this.populateAssignments(e.target.value);

    }

    populateAssignments(value) {
        if (value) {

            axios.get('http://localhost:4000/modules/getByName/' + value,{withCredentials: true}).then((res) => {
                let Module_ID = res.data.ID;
                axios.get('http://localhost:4000/modules/' + Module_ID).then((response) => {
                    response.data.Assignments.forEach((element) => {
                        if (element) {
                            axios.get('http://localhost:4000/assignments/' + element,{withCredentials: true}).then((res) => {
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

    onSubmit(e) {
        e.preventDefault();
        console.log(this.state);
        let Assignment = this.state.Assignment;
        axios.get('http://localhost:4000/assignments/getByName/' + Assignment,{withCredentials: true}).then((res) => {
            let ID = res.data._id;
            axios.delete('http://localhost:4000/assignments/' + ID,{withCredentials: true}).then((res) => {
                alert(res.data);
            })
        });
    }

    componentWillMount() {
        let id = sessionStorage.getItem('UserID');
        axios.get('http://localhost:4000/instructors/' + id,{withCredentials: true}).then((res) => {
            this.setState({
                Modules: res.data.Modules
            });
        });
    }

    render() {
        return (
            <div>
                <h3>Delete Assignment</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group row">
                        <label className="col-md-6 col-form-label">Module : </label>
                        <select onClick={this.onChangeModule}>
                            {
                                this.state.Modules.map((module, i) => {
                                    return (<option value={module} key={i}>{module}</option>)
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-6 col-form-label">Assignment : </label>
                        <select onClick={this.onChangeAssignment}>
                            {
                                this.state.Assignments.map((assignment, i) => {
                                    return (<option value={assignment} key={i}>{assignment}</option>)
                                })
                            }
                        </select>
                    </div>
                    <input type="submit" className="btn btn-danger" value="Delete"/>
                </form>
            </div>
        );
    }
}