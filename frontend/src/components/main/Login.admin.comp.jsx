import React, {Component} from 'react';
import {login} from '../Administrator/Admin.Service';

export default class LoginAdminComp extends Component {

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
        const user = {
            email: this.state.Username,
            password: this.state.Password
        };
        //  this.props.history.push('/home')
        login(user).then(res => {
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

                <div style={{marginTop: 150,border: "#c1c1c1 solid 1px",width:650,height:200}} className="container bg-dark text-light ">
                   {console.log("Username: "+this.state.Username)}
                    {console.log("Password: "+this.state.Password)}
                    <h3>Admin Login</h3>
                    <form style={{marginTop:20}} onSubmit={this.onSubmit}>
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
                        <div style={{marginLeft:300}} className="form-group row">
                            <input type="submit" className="btn btn-primary" value="Login"/>
                        </div>
                    </form>
                </div>
        );
    }
}
