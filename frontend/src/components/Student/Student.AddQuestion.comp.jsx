import React, {Component} from 'react';
import axios from 'axios';


export default class StudentAddQuestionComp extends Component{

    constructor(props){
        super(props);


        this.state={

            itNumber:'',
            module:'',
            question:'',
            email:''

        };

        this.onChangeItnumber = this.onChangeItnumber.bind(this);
        this.onChangeModule = this.onChangeModule.bind(this);
        this.onChangeQuestion = this.onChangeQuestion.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }


    onChangeItnumber(e) {
        this.setState({
            itNumber: e.target.value
        })
    }
    onChangeModule(e) {
        this.setState({
            module: e.target.value
        })
    }
    onChangeQuestion(e) {
        this.setState({
            question: e.target.value
        })
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();

        const AddQuestion = {
            itNumber:this.state.itNumber,
            module:this.state.module,
            question:this.state.question,
            email:this.state.email


        }
        axios.post('http://localhost:4000/addQuestion/',AddQuestion).then(resolve=>{
            console.log(resolve.data.data);
            this.setState({
                itNumber:'',
                module:'',
                question:'',
                email:''

            })
        }).catch(err=>{
            console.log(err)
        })

    }

    render() {
        return(

            <div>
                <h3>Ask Your Questions </h3>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>


                <div>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group row">
                            <label className="col-md-6 col-form-label">IT Number : </label>
                            <input type="text" placeholder="IT********" value={this.state.itNumber} onChange={this.onChangeItnumber}/>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-6 col-form-label">Module Name: </label>
                            <input type="text" placeholder="Module Name" value={this.state.module} onChange={this.onChangeModule}/>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-6 col-form-label">Question : </label>
                            <input type="text" placeholder="Enter Question" value={this.state.question} onChange={this.onChangeQuestion}/>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-6 col-form-label">Email : </label>
                            <input type="text" placeholder="Email" value={this.state.email} onChange={this.onChangeEmail}/>
                        </div>
                        <br/>
                        <br/>
                        <div className="input-group">
                            <div className="col-md-8">
                                <input type="submit" className="btn btn-primary" value="Submit"/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }


}