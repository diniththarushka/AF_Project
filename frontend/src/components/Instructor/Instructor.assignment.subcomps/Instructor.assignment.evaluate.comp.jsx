import React, {Component} from 'react';
import axios from 'axios';

export default class InstructorAssignmentEvaluateComp extends Component {

    constructor(props){
        super(props);

        this.state={
            Modules:[],
            AssignmentID:'',
            Assignments:[],
            Submissions:[],
            Marks:0
        };

        this.onChangeModules = this.onChangeModules.bind(this);
        this.onChangeAssignments = this.onChangeAssignments.bind(this);
        this.onChangeMarks = this.onChangeMarks.bind(this);

        this.populateAssignments = this.populateAssignments.bind(this);
        this.populateSubmissions = this.populateSubmissions.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
        let id = sessionStorage.getItem('UserID');

        axios.get('http://localhost:4000/instructors/'+id,{withCredentials: true}).then((res) => {
            let instructor = res.data;
            this.setState({
                Modules: instructor.Modules
            });
        });
    }

    onChangeModules(e){
        this.setState({
           Assignments:[]
        });
        this.populateSubmissions(e.target.value);
    }

    onChangeAssignments(e){
        let AssignmentName=e.target.value;
        this.populateAssignments(AssignmentName);

        axios.get('http://localhost:4000/assignments/getByName/'+AssignmentName,{withCredentials: true}).then((res)=>{
            let resData =res.data;
            this.setState({
                AssignmentID:resData._id
            })
        });
    }

    onChangeMarks(e){
        this.setState({
            Marks:e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
    }

    populateAssignments(value) { //populate Table
        if (value) {
            axios.get('http://localhost:4000/assignments/getByName/' + value,{withCredentials: true}).then((res) => {
                let resData = res.data;
                this.setState({
                    Submissions: resData.Submissions
                });

            })
        }
    }

    dataCollector(index){
        let assignmentID = this.state.AssignmentID;
        if(assignmentID){
            let submissionID = (document.getElementById('ID'+index).value);
            let marks = (document.getElementById('marks'+index).value);

            let MarksObject={
                SubmissionID:submissionID,
                Marks:marks
            };
            axios.post('http://localhost:4000/assignments/markSubmission/'+assignmentID,MarksObject,{withCredentials: true}).then((res)=>{
                let responseData=res.data;
                alert(responseData);
            })
        }else
            alert('Assignment ID fetching failed.');

    }

    populateSubmissions(value) { //populate select
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

    render() {
        return (
            <div className="container">
                <form onSubmit={this.onSubmit} >
                <h3>Evaluate Assignments</h3>
                    <div style={{marginTop:10}} className="form-group row">
                        <label className="col-md-6 col-form-label">Module: </label>
                        <select id="module" onClick={this.onChangeModules}>
                            {
                                this.state.Modules.map((mod, i) => {
                                    return <option value={mod} key={i}>{mod}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-6 col-form-label">Assignment: </label>
                        <select id="assignment" onClick={this.onChangeAssignments}>
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
                                <td>Marks</td>
                                <td>Evaluate</td>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.Submissions.map((subs,i)=>(

                                    <tr key={i}>

                                        <td>{subs.Student}</td>
                                        <td>{subs.SubmissionLink}</td>
                                        <td>
                                            <input type="number" min="0" max="100" value={subs.Marks} id={"marks"+i}/>
                                            <input type="hidden" id={"ID"+i} value={subs._id}/>
                                        </td>
                                        <td><button onClick={()=>{this.dataCollector(i)}} className="btn btn-outline-light">Submit</button></td>
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