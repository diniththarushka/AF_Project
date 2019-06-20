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

        const hardcodedModules=["Application Frameworks","SA"];//Should be retrieved by session of student

        hardcodedModules.forEach((module)=>{
            axios.get('http://localhost:4000/byModule/'+module).then((res)=>{
                this.setState({
                   Exams:res.data
                });
            })
        })

    }

//Add current time to instructors dash

    render() {
        return (
            <div>
                <h3>Exam Select</h3>
            </div>
        );
    }
}