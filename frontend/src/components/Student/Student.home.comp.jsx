import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import StudentSelectexamComp from "../Student/Student.selectexam.comp";
import StudentDashboard from "../Student/Student.dashboard.comp";
import StudentEditProfile from "../Student/Student.editprofile.comp";
import view from "../Instructor/Instructor.Student.Question.comp";
import StudentQuestion from "./Student.AddQuestion.comp";
import StudentAssignments from "./Student.AssignmentUpload.comp";

class StudentHomeComp extends Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <div className="collpase navbar-collapse">
                            <ul className="navbar-nav mr-auto">
                                <li className="navbar-item">
                                    <Link to="/Student/" className="nav-link">Dashboard</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/Student/assignments" className="nav-link">Assignments</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/Student/exams" className="nav-link">Exams</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/Student/edit-profile" className="nav-link">Edit Profile</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/Student/questions" className="nav-link">Ask Your Questions</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/Student/view" className="nav-link">View</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <Route path="/Student/" exact component={StudentDashboard}/>
                <Route path="/Student/assignments" exact component={StudentAssignments}/>
                <Route path="/Student/exams" component={StudentSelectexamComp}/>
                <Route path="/Student/edit-profile" component={StudentEditProfile}/>
                <Route path="/Student/questions" component={StudentQuestion}/>
                <Route path="/Student/view" component={view}/>
            </Router>
        );
    }
}

export default StudentHomeComp;