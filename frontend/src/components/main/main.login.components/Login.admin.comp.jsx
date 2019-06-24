import React, {Component} from 'react';
import {AdminLogin} from '../../Administrator/Services/Admin.Service';

export default class LoginAdminComp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeUsername(e) {
        this.setState({
            email: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }


    onSubmit(e) {
        e.preventDefault();
        // let Username = this.state.Username;
        // let Password = this.state.Password;
        const user = {
            email: this.state.email,
            password: this.state.password
        };
        AdminLogin(user).then(res => {
            if(res!==false){
                console.log(res.data);
                console.log(res.data._id);
                window.location.href="/home/".concat(res.data._id);
            }else{
                alert("Error: Please Enter valid username and password");
            }

        });
    }

    render() {
        return (

                <div style={{marginTop: 150,border: "#c1c1c1 solid 1px",width:650}} className="container bg-dark text-light ">
                    <h3>Admin Login</h3>
                    <form style={{marginTop:20}} onSubmit={this.onSubmit}>
                        <div className="form-group row">
                            <label className="col-md-6 col-form-label">Email: </label>
                            <input type="email" placeholder="Username" value={this.state.email}
                                   onChange={this.onChangeUsername}/>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-6 col-form-label">Password: </label>
                            <input type="password" placeholder="Password" value={this.state.password}
                                   onChange={this.onChangePassword}/>
                        </div>
                        <div style={{marginLeft:300}} className="form-group row">
                            <input type="submit" className="btn btn-primary" value="Login"/>
                        </div>
                    </form>
                </div>
        );
    }
}
