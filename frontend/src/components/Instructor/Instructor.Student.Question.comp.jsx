import React,{Component} from 'react';
import axios from 'axios';


const Question = props=>(
    <tr>
        <td>{props.questions.itNumber}</td>
        <td>{props.questions.module}</td>
        <td>{props.questions.question}</td>
        <td>{props.questions.email}</td>
    </tr>
);
class ModuleQuestion extends  Component{

    constructor(props){
        super(props);

        this.state={
            Question:[]
        };
    }

    componentDidMount() {
        axios.get('http://localhost:4000/question/allquestions/').then(res=>{
            this.setState({
                Question:res.data.data
            })
        }).catch(err=>{
            console.log(err)
        })
    }
    getCourses(){
        return this.state.Question.map(function (object , i) {
            return <Question questions={object} key={i}/>

        })
    }



    render(){
        return(
            <div >
                <div style={{marginTop:70}} >
                    <table className="container bg-dark text-light align-content-center" border={2} >
                        <thead>
                        <tr>
                            <th>ITNumber</th>
                            <th>Module</th>
                            <th>Question</th>
                            <th>Email</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.getCourses()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ModuleQuestion;