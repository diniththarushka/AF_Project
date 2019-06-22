import React, {Component} from 'react';
import axios from 'axios';

class StudentRegisterComp extends Component {

    constructor(props){
        super(props);
        this.state={
            FirstName:'',
            LastName:'',
            Email:'',
            Password:'',
            StudentID:''
        };

        this.onChangeLName = this.onChangeLName.bind(this);
        this.onChangeFName = this.onChangeFName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeStdID = this.onChangeStdID.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeFName(e){
        this.setState({
            FirstName:e.target.value
        })
    }

    onChangeLName(e){
        this.setState({
            LastName:e.target.value
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

    onChangeStdID(e){
        this.setState({
            StudentID:e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();

        let StudentObj = {
            fName:this.state.FirstName,
            lName:this.state.LastName,
            Email:this.state.Email,
            Password:this.state.Password,
            StudentId:this.state.StudentID
        };

        axios.post('http://localhost:4000/students/studentRegister',StudentObj).then((res)=>{
            alert(res.data.status +" Please Login to continue");
            window.open("/login","_self");
        }).catch((err)=>{
            alert(err);
        })
    }

    render() {
        return (
            <div style={{marginTop: 150,border: "#c1c1c1 solid 1px",width:650}} className="container bg-dark text-light rounded">
                <h3>Register</h3>
                <form style={{marginTop: 50}} onSubmit={this.onSubmit}>
                    <div className="form-group row">
                        <label className="col-md-6 col-form-label">First Name: </label>
                        <input type="text" placeholder="John" value={this.state.FirstName}
                               onChange={this.onChangeFName}/>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-6 col-form-label">Last Name: </label>
                        <input type="text" placeholder="Smith" value={this.state.LastName}
                               onChange={this.onChangeLName}/>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-6 col-form-label">Student ID: </label>
                        <input type="text" placeholder="ITXXXXXXXX" value={this.state.StudentID}
                               onChange={this.onChangeStdID}/>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-6 col-form-label">Email: </label>
                        <input type="email" placeholder="johnsmith@mail.com" value={this.state.Email}
                               onChange={this.onChangeEmail}/>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-6 col-form-label">Password: </label>
                        <input type="password" placeholder="Password" value={this.state.Password}
                               onChange={this.onChangePassword}/>
                    </div>
                    <div style={{marginTop:30,marginLeft: 300}} className="form-group row">
                        <input type="submit" className="btn btn-primary" value="Login"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default StudentRegisterComp;