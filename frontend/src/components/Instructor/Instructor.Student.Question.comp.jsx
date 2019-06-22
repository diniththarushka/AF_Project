import React,{Component} from 'react';
import axios from 'axios';

const Questions = props=>(
    <tr>
        <td>{props.questions.itNumber}</td>
        <td>{props.questions.module}</td>
        <td>{props.questions.question}</td>
        <td>{props.questions.email}</td>
    </tr>
)
class ModuleQuestion extends  Component{

    constructor(props){
        super(props);

        this.state={
            questions:[]
        }
    }
    componentDidMount() {
        axios.get('http://localhost:4000/addQuestion/').then(resolve=>{
            this.setState({
                questions : resolve.data.data
            })
        }).catch(err=>{
            console.log(err)
        })
    }

    getModuleQuestion(){
        return this.state.questions.map(function(object,i){
            return <Questions question={object} key={i}/>
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
                        {this.getModuleQuestion()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ModuleQuestion;