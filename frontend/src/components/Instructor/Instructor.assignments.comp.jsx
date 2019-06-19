import React,{Component} from 'react';

import AddAssignments from './Instructor.assignment.subcomps/Instructor.assignments.add';
import AssignmentSubmissions from './Instructor.assignment.subcomps/Instructor.assignments.submissions';
import AssignmentUpdate from './Instructor.assignment.subcomps/Instructor.assignments.update';

export default class InstructorAssignments extends Component{
    render() {
        return (
            <div>
                <h3 style={{marginTop:50}}><u>Manage Assignments here</u></h3>
                <div style={{marginTop:100}} className="container">
                    <div className="row">
                    <div className="col-sm bg-dark text-light rounded">
                        <AddAssignments/>
                    </div>
                    <div style={{marginLeft:10}} className="col-sm bg-dark text-light rounded">
                        <AssignmentSubmissions/>
                    </div>
                    </div>
                    <div className="row">
                        <div style={{marginTop:10}} className="col-sm-6 bg-dark text-light rounded">
                            <AssignmentUpdate/>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}