import React,{Component} from 'react';
import {BrowserRouter as Router,Route,Link} from "react-router-dom";
import LoginOthersComp from "../main/Login.others.comp";
import LoginAdminComp from './Login.admin.comp';
import RegisterStudentComp from '../Student/Student.system.comps/Student.register.comp';
import StudentProfile from "../Student/Student.profile.comp";



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
                                <Link to="/studentReg" className="nav-link">Student Register</Link>
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
                <Route path="/studentReg" exact component={RegisterStudentComp}/>
                <Route path="/studentProfile" exact component={StudentProfile}/>
            </Router>
        );
    }
}