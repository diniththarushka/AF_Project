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
    // componentDidMount(){
    //     axios.get('http://localhost:4000/question/allquestions/')
    //         .then(response => {
    //             this.setState({ Question : response.data});
    //         })
    //         .catch(function (error){
    //             console.log(error);
    //         })
    // }
    //
    // allQuestions(){
    //     return this.state.Question.map(function(object ,i){
    //         return <questions questions = {object} key = {i} />
    //     });
    // }


    componentDidMount() {
        axios.get('http://localhost:4000/question/allquestions/').then(resolve=>{
            this.setState({
                Question:resolve.data.data
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
            <div className='card'>
                <div className='card-body'>
                    <table className='table'>
                        <thead>
                        <tr className="table-info">
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