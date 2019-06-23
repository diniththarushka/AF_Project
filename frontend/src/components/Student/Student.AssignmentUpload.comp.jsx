import React, {Component} from 'react';
import axios from 'axios';


export default class StudentAssignmentUploadComp extends Component{

    constructor(props){
        super(props);


        this.state={

            subLink:'',
            assignments:'',
            Modules:[],
            assignmentArray:[]
        };

        this.onChangeLink = this.onChangeLink.bind(this);
        this.onChangeAssignment= this.onChangeAssignment.bind(this);
        this.onChangeModule = this.onChangeModule.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    componentWillMount() {
        let id = sessionStorage.getItem('UserID');

        axios.get('http://localhost:4000/students/'+id).then((res)=>{
            let ModulesIDArr = res.data.Modules;
            ModulesIDArr.forEach((moduleID)=>{
                axios.get('http://localhost:4000/modules/'+moduleID).then((response) => {
                    let resData = response.data;
                    this.setState({
                        Modules: this.state.Modules.concat(resData.Name)
                    })
                }).catch((err) => {
                    console.log('Error in fetching instructor for listing modules. Error: ' + err);
                })
            })
        });

    }
    onChangeModule(e){
        let Module = e.target.value;
        this.setState({
            assignmentArray:[]
        });
        axios.get('http://localhost:4000/assignments/getByModule/'+Module).then((res)=>{
            let AssignmentArr = res.data;

            AssignmentArr.forEach((assignment)=>{
                let obj = {
                  Name:assignment.Name,
                  ID:assignment._id
                };
                this.setState({
                    assignmentArray:this.state.assignmentArray.concat(obj)

                });
            });

        });
    }

    onChangeLink(e) {
        this.setState({
            subLink: e.target.value
        })
    }
    onChangeAssignment(e){
        this.setState({
            assignments:e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
        let ID = sessionStorage.getItem('UserID');
        const Submission = {
            StudentID:ID,
            Link:this.state.subLink,
        };
        let assignmentID =this.state.assignments;
        axios.put('http://localhost:4000/assignments/submit/'+assignmentID,Submission).then(response=>{
            alert(response.data);
            this.setState({
                subLink:''
            })
        }).catch(err=>{
            console.log(err)
        })

    }

    render() {
        return(

            <div className="container bg-dark text-light">
                <h3>Add Assignments </h3>
                <form style={{marginTop: 50}} onSubmit={this.onSubmit}>
                    <div className="form-group row">
                        <label className="col-md-6 col-form-label">Module: </label>
                        <select onClick={this.onChangeModule}>
                            {
                                this.state.Modules.map((elem,i)=>{
                                    return <option  key={i} value={elem}>{elem}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-6 col-form-label">Assignment: </label>
                        <select onClick={this.onChangeAssignment}>
                            {
                                this.state.assignmentArray.map((elem,i)=>{
                                    return <option  key={i} value={elem.ID}>{elem.Name}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-6 col-form-label">Link: </label>
                        <textarea placeholder="https://drive.google.com/" value={this.state.subLink}
                                  onChange={this.onChangeLink}  style={{width:300}}/>
                    </div>
                    <div style={{marginTop:30,marginLeft: 300}} className="form-group row">
                        <input type="submit" className="btn btn-primary" value="Add Submission"/>
                    </div>
                </form>
            </div>
        );
    }


}