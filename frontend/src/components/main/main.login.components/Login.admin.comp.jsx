import React, {Component} from 'react';

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
        let Username = this.state.Username;
        let Password = this.state.Password;
    }

    render() {
        return (

                <div style={{marginTop: 150,border: "#c1c1c1 solid 1px",width:650}} className="container bg-dark text-light ">
                    <h3>Admin Login</h3>
                    <form style={{marginTop:20}} onSubmit={this.onSubmit}>
                        <div className="form-group row">
                            <label className="col-md-6 col-form-label">Email: </label>
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
