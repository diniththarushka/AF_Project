import React, {Component} from 'react';
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

        fetch('http://localhost:4000/students/studentLogin/',{
            method: 'POST',
            body: JSON.stringify(Login),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res)=>res.json()).then((resData)=>{
            if(resData.email && resData.password){
                sessionStorage.setItem('UserID',resData._id);
                sessionStorage.setItem('UserName',resData.first_name);
                sessionStorage.setItem('UserLastName',resData.last_name);
                sessionStorage.setItem('UserPassword',resData.password);
                sessionStorage.setItem('UserStudentID',resData.studentId);
                sessionStorage.setItem('UserEmail',resData.email);
                sessionStorage.setItem('UserType','Student');
                window.open("/Student/","_self");
            }else{
                fetch('http://localhost:4000/instructors/auth/',{
                    method: 'POST',
                    body: JSON.stringify(Login),
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res=>res.json())
                    .then(res => {
                        console.log(res);
                        if(res.Email && res.Password){
                            sessionStorage.setItem('UserID',res._id);
                            sessionStorage.setItem('UserName',res.Name);
                            sessionStorage.setItem('UserEmail',res.Email);
                            sessionStorage.setItem('UserPassword',res.Password);
                            sessionStorage.setItem('UserType','Instructor');
                            window.open("/Instructor/","_self");
                        }else
                            alert('Login failed. You should register');

                    }).catch((err)=>{
                    alert('Login failed. You should register');
                });
            }

        }).catch((err)=>{
            console.log('here');
            alert('Login failed. You should register');
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
