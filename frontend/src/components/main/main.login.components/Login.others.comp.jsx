import React, {Component} from 'react';
import axios from 'axios';

export default class LoginOthersComp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Username: '',
            Password: ''
        };

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeUsername(e) {
        this.setState({
            Username: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
            Password: e.target.value
        })
    }


    onSubmit(e) {
        e.preventDefault();

        let Login = {
            Email: this.state.Username,
            Password: this.state.Password
        };
        console.log(Login);
        axios.post('http://localhost:4000/students/studentLogin/',Login,{withCredentials:false}).then((res)=>{
            let responseData = res.data;
            console.log(responseData);
            if(responseData.email && responseData.password){
                sessionStorage.setItem('UserID',responseData._id);
                sessionStorage.setItem('UserName',responseData.first_name);
                sessionStorage.setItem('UserLastName',responseData.last_name);
                sessionStorage.setItem('UserPassword',responseData.password);
                sessionStorage.setItem('UserStudentID',responseData.studentId);
                sessionStorage.setItem('UserEmail',responseData.email);
                sessionStorage.setItem('UserType','Student');

                this.setState({
                    Username: '',
                    Password: ''
                });
                window.open("/Student/","_self");
            }else{
                console.log("No valid student account");
            }
        }).catch((err)=>{
            console.log('hello');
            axios.post('http://localhost:4000/instructors/auth/',Login,{withCredentials:true}).then(res => {
                let resData = res.data;
                console.log(resData);
                if(resData.Email && resData.Password){
                    sessionStorage.setItem('UserID',resData._id);
                    sessionStorage.setItem('UserName',resData.Name);
                    sessionStorage.setItem('UserEmail',resData.Email);
                    sessionStorage.setItem('UserPassword',resData.Password);
                    sessionStorage.setItem('UserType','Instructor');
                    this.setState({
                        Username: '',
                        Password: ''
                    });
                    window.open("/Instructor/","_self");
                }else
                    alert('Login failed. You should register');

            }).catch((err)=>{
                console.log(err);
                alert('Login failed. You should register');
            });
        });
    }

    render() {
        return (
            <div style={{marginTop: 150, width: 650, height: 200}} className="container bg-dark text-light rounded">
                <h3> Login</h3>
                <form style={{top: 20}} onSubmit={this.onSubmit}>
                    <div className="form-group row">
                        <label className="col-md-6 col-form-label">Username: </label>
                        <input type="email" placeholder="Username" value={this.state.Username}
                               onChange={this.onChangeUsername}/>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-6 col-form-label">Password: </label>
                        <input type="password" placeholder="Password" value={this.state.Password}
                               onChange={this.onChangePassword}/>
                    </div>
                    <div style={{marginLeft: 300}} className="form-group row">
                        <input type="submit" className="btn btn-primary" value="Login"/>
                    </div>
                </form>
            </div>
        );
    }
}
