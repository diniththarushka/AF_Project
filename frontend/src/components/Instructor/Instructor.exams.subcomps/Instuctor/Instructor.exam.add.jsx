import React, {Component} from 'react';
import axios from 'axios';

export default class AddExam extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Name: '',
            Duration: 0,
            Module: '',
            NumOfQuestions: 0,
            Modules: [],
            AutoGrade: false,
            QuestionBank: [{
                Question: '',
                Answers: [],
                CorrectAns: 0
            }]
        };
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeModule = this.onChangeModule.bind(this);
        this.onChangeAutoGrade = this.onChangeAutoGrade.bind(this);
        this.onChangeQuestion = this.onChangeQuestion.bind(this);
        this.onChangeAnswer = this.onChangeAnswer.bind(this);
        this.onChangeNumberofQuestions = this.onChangeNumberofQuestions.bind(this);
        this.onChangeCorrectAnswer = this.onChangeCorrectAnswer.bind(this);

        this.generateTable = this.generateTable.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
        let id = sessionStorage.getItem('UserID');

        axios.get('http://localhost:4000/Instructors/' + id).then((response) => {
            this.setState({
                Modules: response.data.Modules
            });
        }).catch((err) => {
            console.log(err);
        })
    }

    onChangeName(e) {
        this.setState({
            Name: e.target.value
        })
    }

    onChangeDuration(e) {
        this.setState({
            Duration: e.target.value
        })
    }

    onChangeModule(e) {
        this.setState({
            Module: e.target.value
        })
    }

    onChangeAutoGrade(e) {
        this.setState({
            AutoGrade: e.target.value
        })
    }

    onChangeNumberofQuestions(e) {
        this.setState({
            NumOfQuestions: e.target.value
        });
    }

    onChangeQuestion(e) {

    }

    onChangeAnswer(e) {

    }

    onChangeCorrectAnswer(e) {

    }

    generateTable() {
        if (document.getElementById('rows') == null) {

        } else {
            let rows = document.getElementById('rows').value;
            console.log(rows);
            if (rows > 0) {
                let tableDiv = document.getElementById('tableDiv');
                let table = document.createElement('table');


                for (let i = 0; i < rows; i++) {
                    let QuestionText = document.createTextNode('--Question ' + (i + 1) + ": ");

                    let Questiontr = document.createElement('tr');
                    let QuestionNametd = document.createElement('td').appendChild(QuestionText);
                    let QuestionInput = document.createElement('textarea');
                    QuestionInput.setAttribute('type', 'text');
                    QuestionInput.setAttribute('id', 'Question' + (i + 1));
                    let QuestionInputtd = document.createElement('td').appendChild(QuestionInput);

                    Questiontr.appendChild(QuestionNametd);
                    Questiontr.appendChild(QuestionInputtd);

                    let Answer1Text = document.createTextNode('Answer ' + (i + 1) + ".1: ");

                    let Answer1tr = document.createElement('tr');
                    let Answer1Nametd = document.createElement('td').appendChild(Answer1Text);
                    let Answer1Input = document.createElement('input');
                    Answer1Input.setAttribute('type', 'text');
                    Answer1Input.setAttribute('id', 'Answer' + (i + 1) + ".1");
                    let Answer1Inputtd = document.createElement('td').appendChild(Answer1Input);

                    Answer1tr.appendChild(Answer1Nametd);
                    Answer1tr.appendChild(Answer1Inputtd);

                    let Answer2Text = document.createTextNode('Answer ' + (i + 1) + ".2: ");

                    let Answer2tr = document.createElement('tr');
                    let Answer2Nametd = document.createElement('td').appendChild(Answer2Text);
                    let Answer2Input = document.createElement('input');
                    Answer2Input.setAttribute('type', 'text');
                    Answer2Input.setAttribute('id', 'Answer' + (i + 1) + ".2");
                    let Answer2Inputtd = document.createElement('td').appendChild(Answer2Input);

                    Answer2tr.appendChild(Answer2Nametd);
                    Answer2tr.appendChild(Answer2Inputtd);

                    let Answer3Text = document.createTextNode('Answer ' + (i + 1) + ".3: ");

                    let Answer3tr = document.createElement('tr');
                    let Answer3Nametd = document.createElement('td').appendChild(Answer3Text);
                    let Answer3Input = document.createElement('input');
                    Answer3Input.setAttribute('type', 'text');
                    Answer3Input.setAttribute('id', 'Answer' + (i + 1) + ".3");
                    let Answer3Inputtd = document.createElement('td').appendChild(Answer3Input);

                    Answer3tr.appendChild(Answer3Nametd);
                    Answer3tr.appendChild(Answer3Inputtd);

                    let Answer4Text = document.createTextNode('Answer ' + (i + 1) + ".4: ");

                    let Answer4tr = document.createElement('tr');
                    let Answer4Nametd = document.createElement('td').appendChild(Answer4Text);
                    let Answer4Input = document.createElement('input');
                    Answer4Input.setAttribute('type', 'text');
                    Answer4Input.setAttribute('id', 'Answer' + (i + 1) + ".4");
                    let Answer4Inputtd = document.createElement('td').appendChild(Answer4Input);

                    Answer4tr.appendChild(Answer4Nametd);
                    Answer4tr.appendChild(Answer4Inputtd);

                    let CorrectAnswerText = document.createTextNode('Correct Answer:Q' + (i + 1) + ": ");

                    let CorrectAnstr = document.createElement('tr');
                    let CorrectAnsNametd = document.createElement('td').appendChild(CorrectAnswerText);
                    let CorrectAnsInput = document.createElement('input');
                    CorrectAnsInput.setAttribute('type', 'number');
                    CorrectAnsInput.setAttribute('min', '1');
                    CorrectAnsInput.setAttribute('max', '4');
                    CorrectAnsInput.setAttribute('id', 'CorrectAnswer' + (i + 1));
                    let CorrectAnsInputtd = document.createElement('td').appendChild(CorrectAnsInput);

                    CorrectAnstr.appendChild(CorrectAnsNametd);
                    CorrectAnstr.appendChild(CorrectAnsInputtd);

                    table.appendChild(Questiontr);
                    table.appendChild(Answer1tr);
                    table.appendChild(Answer2tr);
                    table.appendChild(Answer3tr);
                    table.appendChild(Answer4tr);
                    table.appendChild(CorrectAnstr);
                }
                tableDiv.appendChild(table);
            }
        }
    }

    onSubmit(e) {
        e.preventDefault();
        let module = document.getElementById('module').value;
        let autograde = document.getElementById('grading').value;
        this.setState({
            Module: module,
            AutoGrade: autograde
        });

        let QuestionCount = this.state.NumOfQuestions;
        let QuestionBank = [];

        for(let i=0;i<QuestionCount;i++){
            let Question = document.getElementById('Question'+(i+1)).value;
            let Answer1 = document.getElementById('Answer'+(i+1)+".1").value;
            let Answer2 = document.getElementById('Answer'+(i+1)+".2").value;
            let Answer3 = document.getElementById('Answer'+(i+1)+".3").value;
            let Answer4 = document.getElementById('Answer'+(i+1)+".4").value;
            let CorrectAns = document.getElementById('CorrectAnswer'+(i+1)).value;


            let QuestionObject = {
                Question:Question,
                Answers:[Answer1,Answer2,Answer3,Answer4],
                CorrectAns:parseInt(CorrectAns)
            };

            QuestionBank.push(QuestionObject);
        }

        let ExamObj = {
            Name:this.state.Name,
            Duration:parseInt(this.state.Duration),
            Module:module,
            AutoGrade:autograde,
            QuestionBank:QuestionBank
        };

        axios.post('http://localhost:4000/exams/',ExamObj).then((res)=>{
            alert(res.data);
        })

    }

    render() {
        return (
            <div>
                <h3> Add Exam</h3>
                <div className="container">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group row">
                            <label className="col-md-6 col-form-label">Name: </label>
                            <input type="text" value={this.state.Name} onChange={this.onChangeName}
                                   placeholder="Exam Name"/>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-6 col-form-label">Duration(in Minutes): </label>
                            <input type="number" min="1" value={this.state.Duration} onChange={this.onChangeDuration}
                                   placeholder="In Minutes"/>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-6 col-form-label">Auto Grade: </label>

                            <table>
                                <tbody>
                                <tr>
                                    <td>
                                        <label className="col-form-label">True: </label>
                                        <input type="radio" onChange={this.onChangeAutoGrade} name="grading" id="grading"
                                               value={true}/>
                                    </td>
                                    <td>
                                        <label className="col-form-label">False: </label>
                                        <input type="radio" checked={true} name="grading" onChange={this.onChangeAutoGrade}
                                               id="grading" value={false}/>
                                    </td>
                                </tr>
                                </tbody>
                            </table>


                        </div>
                        <div className="form-group row">
                            <label className="col-md-6 col-form-label">Module: </label>
                            <select id="module" onClick={this.onChangeModule}>
                                {
                                    this.state.Modules.map((mod, i) => {
                                        return <option value={mod} key={i}>{mod}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-6 col-form-label">Number of Questions: </label>
                            <input type="number" id="rows" min="1" value={this.state.NumOfQuestions}
                                   onChange={this.onChangeNumberofQuestions}/>

                            <input type="button" value="Generate Table" className="btn btn-primary"
                                   onClick={() => {
                                       this.generateTable()
                                   }}/>
                        </div>

                        <div id="tableDiv"/>

                        <div className="form-group row">
                            <input type="submit" value="Submit" className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}