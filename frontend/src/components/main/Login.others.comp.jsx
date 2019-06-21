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

        console.log("email: "+Login.Email);
        console.log("password: "+Login.Password);

        axios.post('http://localhost:4000/Instructors/login/',Login).then((res) => {
                let result = res.data.result;

                console.log("Result: "+result);
                if (result) {
                    console.log('Instructor available');
                }else{
                    //check for student
                }
            }
        )
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
