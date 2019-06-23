import React,{Component} from 'react';
import axios from 'axios';


export default class StudentRegister extends Component{

    constructor(props){
        super(props);

        this.onChangefName = this.onChangefName.bind(this);
        this.onChangelName = this.onChangelName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeStudentId = this.onChangeStudentId.bind(this);


        this.state={
            fName:'',
            lName:'',
            Email:'',
            Password:'',
            StudentId:''
        }
    }

    onChangefName(e){
        this.setState({
            fName:e.target.value
        })
    }

    onChangelName(e){
        this.setState({
            lName:e.target.value
        })
    }

    onChangeEmail(e){
        this.setState({
            Email:e.target.value
        })
    }

    onChangePassword(e){
        this.setState({
            Password:e.target.value
        })
    }

    onChangeStudentId(e){
        this.setState({
            StudentId:e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();

        const student ={
            fName:this.state.fName,
            lName:this.state.lName,
            Email:this.state.Email,
            Password:this.state.Password,
            StudentId:this.state.StudentId
        }

        axios.post('http://localhost:4000/Students/studentRegister',student).then(resolve=>{
            console.log(resolve.data.data)
            this.setState({
                fName:'',
                lName:'',
                Email:'',
                Password:'',
                StudentId:''
            })
        }).catch(err=>{
            console.log(err)
        })


    }

    render() {
        return(
            <div className="col-sm bg-dark text-light rounded" style={{marginTop:30}}>
                <h3><u>Student Registration</u></h3>

                <div className="container" style={{marginTop:50}}>
                    <form className="form-group" onSubmit={this.onSubmit}>
                        <div className="form-group row">
                            <label className="col-md-6 col-form-label">First Name: </label>
                            <input type="text" value={this.state.fName} onChange={this.onChangefName}/>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-6 col-form-label">Last Name: </label>
                            <input type="text" value={this.state.lName} onChange={this.onChangelName}/>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-6 col-form-label">Email: </label>
                            <input type="email" value={this.state.Email} onChange={this.onChangeEmail}/>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-6 col-form-label">Password: </label>
                            <input type="password" value={this.state.Password} onChange={this.onChangePassword} placeholder="*******"/>
                        </div>

                        <div className="form-group row">
                            <label className="col-md-6 col-form-label">Student ID: </label>
                            <input type="text" value={this.state.StudentId} onChange={this.onChangeStudentId}/>
                        </div>

                        {/*<div className="form-group row">*/}
                            {/*<label className="col-md-6 col-form-label">Module(Update access denied): </label>*/}
                            {/*<select>*/}
                                {/*{*/}
                                    {/*this.state.Module.map((module,i)=>{*/}
                                        {/*return(<option key={i} value={module}>{module}</option>)*/}
                                    {/*})*/}
                                {/*}*/}
                            {/*</select>*/}
                        {/*</div>*/}
                        {/*<div className="form-group row">*/}
                            {/*<label className="col-md-6 col-form-label">Faculty(Update access denied): </label>*/}
                            {/*<select>*/}
                                {/*{*/}
                                    {/*this.state.Faculty.map((module,i)=>{*/}
                                        {/*return(<option key={i} value={module}>{module}</option>)*/}
                                    {/*})*/}
                                {/*}*/}
                            {/*</select>*/}
                        {/*</div>*/}
                        <div className="container">
                            <input type="submit" className="btn btn-primary" value="Register"/>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}