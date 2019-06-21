import React, {Component} from 'react';
import InstructorAssignmentEvaluateComp from './Instructor.assignment.subcomps/Instructor.assignment.evaluate.comp';

export default class InstructorEvaluateComp extends Component {
    render() {
        return (
            <div>
                <h3 style={{marginTop:50}}><u>Evaluate Assignments here</u></h3>
                <div style={{marginTop:100}} className="container">
                    <div className="row">
                        <div className="col-sm bg-dark text-light rounded">
                            <InstructorAssignmentEvaluateComp/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}