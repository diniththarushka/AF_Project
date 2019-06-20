import React,{Component} from 'react';
import SelectExam from './Instructor.exams.subcomps/Student/Student.selectExam.comp'

export default class InstructorModuleStats extends Component{
    render() {
        return (
            <div>
                <h3>This is stats comp</h3>
                <SelectExam/>
            </div>
        );
    }
}