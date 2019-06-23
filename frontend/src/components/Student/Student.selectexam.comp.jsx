import React, {Component} from 'react';
import axios from 'axios';

class StudentSelectexamComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ExamData: [],
            StudentModules: [],
            Name: '',
            Duration: '',
            EnrollmentKey: '',
            Module: '',
            AutoGrade: false,
            Completed: false,
            SubmissionDate: 0
        };
        this.onChangeModule = this.onChangeModule.bind(this);
        this.loadExamDetails = this.loadExamDetails.bind(this);
        this.attemptExam = this.attemptExam.bind(this);
    };

    loadExamDetails(moduleName) {
        axios.get('http://localhost:4000/exams/byModule/' + moduleName).then((res) => {
            let exams = res.data;
            this.setState({
                ExamData: exams
            })
        })
    }

    onChangeModule(e) {
        let Module = e.target.value;
        if (e.target.value) {
            this.setState({
                Module: e.target.value
            });
            this.loadExamDetails(Module);
        } else
            alert('Enroll to a module first..!');
    }

    componentWillMount() {

        if (sessionStorage.getItem('UserID') && sessionStorage.getItem('UserType') === 'Student') {
            let id = sessionStorage.getItem('UserID');
            axios.get('http://localhost:4000/students/' + id).then((res) => {
                let resData = res.data;
                let ModuleResponse = resData.Modules;
                if (ModuleResponse.length === 0) {
                    document.getElementById('moduleSelect').setAttribute('disabled', 'disabled');
                    alert("Looks like you don't have any module enrollments. Enroll now..!");
                } else {
                    let ModulesArr = [];
                    ModuleResponse.forEach((moduleID) => {
                        axios.get('http://localhost:4000/modules/' + moduleID).then((response) => {
                            let ModuleName = response.data.Name;
                            ModulesArr.push(ModuleName);
                            if (ModulesArr.length === ModuleResponse.length) {
                                this.setState({
                                    StudentModules: ModulesArr
                                })
                            }
                        });
                    });
                }
            }).catch((err) => {
                alert('Server error: ' + err);
            });
        }
    }

    attemptExam(exam) {
        let enroll = prompt('You are about to start your attempt\n\tExam: ' + exam.Name
            + "\n\tTime Allocated: " + exam.Duration + "\n\tQuestions: " + exam.Questions
            + "\nGood Luck with your exam...!\nEnter Exam enrollment key...");

        if (exam.EnrollmentKey === enroll) {
            let ExamValidationData={
              EnrollmentKey: enroll
            };
            axios.post('http://localhost:4000/exams/auth',ExamValidationData,{withCredentials:true}).then((res)=>{
                let ExamData=res.data;
                sessionStorage.setItem('ExamID',ExamData._id);
                sessionStorage.setItem('ExamName',ExamData.Name);
                sessionStorage.setItem('Module',ExamData.Module);
                window.open("../attempt_exam/","_self");
            }).catch((err)=>{
                console.log(err);
                alert('Error connecting to server: '+err);
            });

        } else {
            alert('Invalid enrollment key. Try again');
        }
    }

    render() {
        return (
                <div>
                    <h3>Available Exams</h3>
                    <div>
                        <label className="alert-danger">Please Note: Exams are valid only for 6 hours after
                            publishment.</label>
                    </div>
                    <div>
                        <label>Module: </label>
                        <select id="moduleSelect" onClick={this.onChangeModule}>
                            {
                                this.state.StudentModules.map((module, i) => {
                                    return (<option value={module} key={i}>{module}</option>);
                                })
                            }
                        </select>
                    </div>
                    <div id="examsList" className="container" align="center" style={{marginTop: 50}}>
                        <table className="table table-hover bg-light text-center">
                            <thead>
                            <tr>
                                <td>Name</td>
                                <td>Module</td>
                                <td>Questions</td>
                                <td>Allocated Time</td>
                                <td>Attempt</td>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.ExamData.map((exam, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{exam.Name}</td>
                                            <td>{exam.Module}</td>
                                            <td>{exam.Questions}</td>
                                            <td>{exam.Duration}</td>
                                            <td><input type="button" value="Attempt Now" onClick={() => {
                                                this.attemptExam(exam)
                                            }} className="btn btn-outline-primary"/></td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
        );
    }
}

export default StudentSelectexamComp;