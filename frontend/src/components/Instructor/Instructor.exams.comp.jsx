import React,{Component} from 'react';
import ViewMarks from './Instructor.exams.subcomps/Instuctor/Instructor.exam.marks';
import AddExam from './Instructor.exams.subcomps/Instuctor/Instructor.exam.add';

export default class InstructorExams extends Component{
    render() {
        return (
            <div>
                <h3 style={{marginTop:50}}><u>Manage Exams here</u></h3>
                <div style={{marginTop:100}} className="container">
                    <div className="row">
                        <div className="col-sm bg-dark text-light rounded">
                            <AddExam/>
                        </div>
                        <div style={{marginLeft:10}} className="col-sm bg-dark text-light rounded">
                            <ViewMarks/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}