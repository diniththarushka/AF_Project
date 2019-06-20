import React,{Component} from 'react';
import {BrowserRouter as Router,Route,Link} from "react-router-dom";
import LoginOthersComp from "../main/Login.others.comp";
import LoginAdminComp from './Login.admin.comp';

export default class HomeHandler extends Component{
    render() {
        return (
            <Router>
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="collpase navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/" className="nav-link">Home</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/register" className="nav-link">Register</Link>
                            </li>
                            <li className="navbar-item" style={{position:"absolute",right:10}}>
                                <Link to="/admin" className="nav-link">Admin Login</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
                <Route path="/" exact component={LoginOthersComp} />
                <Route path="/admin" exact component={LoginAdminComp} />
            </Router>
        );
    }
}