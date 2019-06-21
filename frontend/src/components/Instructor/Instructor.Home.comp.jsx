import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

import InstructorModules from './Instructor.modules.comp';
import InstructorAssignments from './Instructor.assignments.comp';
import InstructorExams from './Instructor.exams.comp';
import InstructorEditProfile from './Instructor.editprofile.comp';
import InstructorModuleStats from './Instructor.stats.comp';
import InstructorEvaluateComp from './Instructor.evaluate.comp';

export default class InstructorHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            CurrentTime: new Date().toLocaleString(),
        }
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                CurrentTime: new Date().toLocaleString()
            })
        }, 1000)
    }

    render() {
        return (
            <Router>
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <div className="collpase navbar-collapse">
                            <ul className="navbar-nav mr-auto">
                                <li className="navbar-item">
                                    <Link to="/Instructor/" className="nav-link">My Modules</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/Instructor/assignments" className="nav-link">Assignments</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/Instructor/exams" className="nav-link">Exams</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/Instructor/evaluate" className="nav-link">Evaluate</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/Instructor/edit-profile" className="nav-link">Edit Profile</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/Instructor/stats" className="nav-link">Statistics</Link>
                                </li>
                                <li style={{position: "absolute", right: 10, marginTop: 10}}
                                    className="navbar-item text-light">
                                    {this.state.CurrentTime}
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <Route path="/Instructor/" exact component={InstructorModules}/>
                <Route path="/Instructor/assignments" exact component={InstructorAssignments}/>
                <Route path="/Instructor/exams" component={InstructorExams}/>
                <Route path="/Instructor/edit-profile" component={InstructorEditProfile}/>
                <Route path="/Instructor/evaluate" component={InstructorEvaluateComp}/>
                <Route path="/Instructor/stats" component={InstructorModuleStats}/>
            </Router>
        );
    }
}