import React, {Component} from 'react';
import axios from 'axios';


export default class StudentAddQuestionComp extends Component {

    constructor(props) {
        super(props);


        this.state = {

            itNumber: '',
            module: '',
            question: '',
            email: ''

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

    onSubmit(e) {
        e.preventDefault();

        let StudentID = sessionStorage.getItem('UserStudentID');
        let StudentEmail = sessionStorage.getItem('UserEmail');
        const AddQuestion = {
            itNumber: StudentID,
            module: this.state.module,
            question: this.state.question,
            email: StudentEmail


        };
        console.log(AddQuestion);

        axios.post('http://localhost:4000/question/add', AddQuestion).then(resolve => {
            this.setState({
                itNumber: '',
                module: '',
                question: '',
                email: ''
            });
            alert('Question submitted for the lecturer panel.');
        }).catch(err => {
            console.log(err)
        })

    }

    render() {
        return (

            <div className="container bg-dark text-light">
                <h3>Ask Your Questions </h3>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>


                <div>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group row">
                            <label className="col-md-6 col-form-label">Module Name: </label>
                            <input type="text" placeholder="Module Name" value={this.state.module}
                                   onChange={this.onChangeModule}/>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-6 col-form-label">Question : </label>
                            <textarea style={{width:400}} placeholder="Enter your Question here" value={this.state.question}
                                      onChange={this.onChangeQuestion}/>
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