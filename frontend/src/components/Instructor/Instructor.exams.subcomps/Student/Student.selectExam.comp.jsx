import React,{Component} from 'react';
import axios from 'axios';

export default class SelectExam extends Component{
    constructor(props){
        super(props);

        this.state={
            Exams:[]
        }
    }

    componentWillMount() {


    }

    render() {
        return (
            <div>
                <h3>Exam Select</h3>
                <div>
                    <select>
                        {
                            this.state.Exams.map((exam,i)=>{
                                return(<option>{exam}</option>)
                            })
                        }
                    </select>
                </div>
            </div>
        );
    }
}