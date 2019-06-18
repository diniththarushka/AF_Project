import React,{Component} from 'react';

import AddAssignments from './Instructor.assignment.subcomps/Instructor.assignments.add'
import AssignmentSubmissions from './Instructor.assignment.subcomps/Instructor.assignments.submissions'

export default class InstructorAssignments extends Component{
    render() {
        return (
            <div>
                <h3 style={{marginTop:50}}>Manage Assignments here</h3>
                <div style={{marginTop:100}} className="container">
                    <div className="row">
                    <div className="col-sm bg-dark text-light rounded">
                        <AddAssignments/>
                    </div>
                    <div style={{marginLeft:10}} className="col-sm bg-dark text-light rounded">
                        <AssignmentSubmissions/>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}