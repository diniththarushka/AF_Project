import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Route,Link} from "react-router-dom";

import StudentModules from './Student.modules.comp';
// import InstructorAssignments from './Instructor.assignments.comp';
// import InstructorExams from './Instructor.exams.comp';
// import InstructorEditProfile from './Instructor.editprofile.comp';
// import InstructorModuleStats from './Instructor.stats.comp';

export default class StudentHome extends Component{

    constructor(props){
        super(props);
        this.state = {
            CurrentTime: new Date().toLocaleString(),
        }
    }

    componentDidMount() {
        setInterval( () => {
            this.setState({
                CurrentTime : new Date().toLocaleString()
            })
        },1000)
    }

    render() {
        return(
            <Router>
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <div className="collpase navbar-collapse">
                            <ul className="navbar-nav mr-auto">
                                <li className="navbar-item">
                                    <Link to="/" className="nav-link">My Modules</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/assignments" className="nav-link">Assignments</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/exams" className="nav-link">Exams</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/edit-profile" className="nav-link">Edit Profile</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/stats" className="nav-link">Statistics</Link>
                                </li>
                                <li style={{position:"absolute",right:10,marginTop:10}} className="navbar-item text-light">
                                    {this.state.CurrentTime}
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <Route path="/" exact component={StudentModules} />
                <Route path="/assignments" exact component={InstructorAssignments} />
                <Route path="/exams" component={InstructorExams} />
                <Route path="/edit-profile" component={InstructorEditProfile} />
                <Route path="/stats" component={InstructorModuleStats}/>
            </Router>
        );
    }
}