import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import StudentSelectexamComp from "../Student/Student.selectexam.comp";
import AssignmentsUpload from "./Student.AssignmentUpload.comp";
import AddQuestion from "./Student.AddQuestion.comp";


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
                                    <Link to="/Student/addQuestion" className="nav-link">Add Your Questions</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>

                <Route path="/Student/" exact component={StudentSelectexamComp}/>
                <Route path="/Student/assignments" exact component={AssignmentsUpload}/>
                <Route path="/Student/exams" component={StudentSelectexamComp}/>
                <Route path="/Student/edit-profile" component={StudentSelectexamComp}/>


                <Route path="/Student/addQuestion" exact component={AddQuestion}/>

            </Router>
        );
    }
}

export default StudentHomeComp;