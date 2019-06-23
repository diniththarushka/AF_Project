import React, {Component} from 'react';
import axios from 'axios';

class StudentAttemptExam extends Component {

    constructor(props) {
        super(props);

        this.state = {
            AG: false,
            CurrentAnswer: '',
            CurrentQuestion: '',
            AnswerSheet: [],
            QuestionBank: [],
            Marks: 0
        };
        this.onChangeAnswer = this.onChangeAnswer.bind(this);
        this.InvokeQuestion = this.InvokeQuestion.bind(this);
        this.AddAnswer = this.AddAnswer.bind(this);
        this.Submit = this.Submit.bind(this);
    }

    onChangeAnswer(e) {
        this.setState({
            CurrentAnswer: e.target.value
        })
    }

    AddAnswer() {
        let x = this.state.CurrentQuestion;
        let qDiv = document.getElementById('QNumber' + x);
        qDiv.className = "btn btn-light";

        let Question = this.state.CurrentQuestion;
        let Answer;
        if (document.getElementById('Answer1').checked) {
            Answer = 1;
        } else if (document.getElementById('Answer2').checked) {
            Answer = 2;
        } else if (document.getElementById('Answer3').checked) {
            Answer = 3;
        } else if (document.getElementById('Answer4').checked) {
            Answer = 4;
        } else
            Answer = 0;

        if (!(Question === 0 || Answer === 0)) {

            let QA = {
                Question: Question,
                Answer: Answer
            };

            this.setState({
                AnswerSheet: this.state.AnswerSheet.concat(QA)
            })
        }
    }

    AutoGrading() {
        return new Promise((resolve, reject) => {
            let CorrectAnswers = 0;
            let CorrectQuestions = [];
            let QB = this.state.QuestionBank;
            let AS = this.state.AnswerSheet;

            let CQuestion;
            let GivenAnswer;
            let CAnswer;

            if (this.state.AG) {
                for (let i = 0; i < QB.length; i++) {
                    CQuestion = i;
                    CAnswer = QB[i].CorrectAns;
                    for (let k = 0; k < AS.length; k++) {
                        GivenAnswer = AS[k].Answer;
                        if (!CorrectQuestions.includes(AS[k].Question)) {

                            if (GivenAnswer === CAnswer) {
                                CorrectAnswers++;
                                CorrectQuestions.push((i + 1));
                            }
                        }
                    }

                    if ((i + 1) === QB.length) {
                        let Marks = (CorrectQuestions.length / QB.length) * 100;
                        this.setState({
                            Marks: Marks
                        });
                        resolve({Marks: Marks});
                    }
                }
            }
        });
    }

    InvokeQuestion(i) {
        let Array_index = (i - 1);
        const QDiv = document.getElementById('Question');
        const Ans1Div = document.getElementById('Answer1Div');
        const Ans2Div = document.getElementById('Answer2Div');
        const Ans3Div = document.getElementById('Answer3Div');
        const Ans4Div = document.getElementById('Answer4Div');

        QDiv.innerHTML = '';
        Ans1Div.innerHTML = '';
        Ans2Div.innerHTML = '';
        Ans3Div.innerHTML = '';
        Ans4Div.innerHTML = '';

        this.QuestionRenderer(Array_index);
    }

    QuestionRenderer(i) {
        this.setState({
            CurrentQuestion: (i + 1)
        });

        if (i >= 0 && this.state.QuestionBank.length > 0) {
            let QuestionObj = this.state.QuestionBank[i];

            const QTxt = document.createTextNode('Question ' + (i + 1) + ': ' + QuestionObj.Question);
            const Ans1Txt = document.createTextNode('Answer 1:  ' + QuestionObj.Answers[0]);
            const Ans2Txt = document.createTextNode('Answer 2:  ' + QuestionObj.Answers[1]);
            const Ans3Txt = document.createTextNode('Answer 3:  ' + QuestionObj.Answers[2]);
            const Ans4Txt = document.createTextNode('Answer 4:  ' + QuestionObj.Answers[3]);

            const QDiv = document.getElementById('Question');
            const Ans1Div = document.getElementById('Answer1Div');
            const Ans2Div = document.getElementById('Answer2Div');
            const Ans3Div = document.getElementById('Answer3Div');
            const Ans4Div = document.getElementById('Answer4Div');

            QDiv.appendChild(QTxt);
            Ans1Div.appendChild(Ans1Txt);
            Ans2Div.appendChild(Ans2Txt);
            Ans3Div.appendChild(Ans3Txt);
            Ans4Div.appendChild(Ans4Txt);
        }
    }

    componentWillMount() {
        if (sessionStorage.getItem('ExamID')) {
            let id = sessionStorage.getItem('ExamID');

            axios.get('http://localhost:4000/exams/' + id, {withCredentials: true}).then((res) => {
                let ExamResponse = res.data;
                this.setState({
                    AG: ExamResponse.AutoGrade,
                    QuestionBank: ExamResponse.QuestionBank
                });
                if (this.state.QuestionBank.length > 0) {
                    let QBank = this.state.QuestionBank;
                    this.QuestionNumberDivBuilder(QBank.length);
                    this.QuestionRenderer(0);
                }
            }).catch(() => {
                alert("Invalid Data You'll be redirected now");
                window.open("../", "_self");
            })

        } else {
            alert('Unauthorized path. You will be redirected now.');
            window.open("../", "_self");
        }
    }

    QuestionNumberDivBuilder(count) {
        if (count) {
            const QuestionCount = count;
            const MainDiv = document.getElementById('QuestionNumbers');

            if (QuestionCount <= 5) {
                const RowDiv = document.createElement('div');
                RowDiv.className = 'row';
                RowDiv.style.margin = '10px';
                for (let k = 1; k <= QuestionCount; k++) {
                    const QuestionNumber = document.createTextNode(k.toString());
                    const QuestionDiv = document.createElement('div');
                    QuestionDiv.appendChild(QuestionNumber);
                    QuestionDiv.id = 'QNumber' + k;
                    QuestionDiv.className = 'btn btn-outline-dark rounded text-center';
                    QuestionDiv.onclick = () => {
                        this.InvokeQuestion(k)
                    };
                    QuestionDiv.style.margin = '10px';
                    QuestionDiv.style.width = '35px';
                    QuestionDiv.style.height = '35px';
                    RowDiv.appendChild(QuestionDiv);
                }
                MainDiv.appendChild(RowDiv);
            } else {
                let RowDiv;
                let c = 1;
                let k = Math.floor(QuestionCount / 5);
                for (let j = 1; j <= k + 1; j++) {
                    RowDiv = document.createElement('div');
                    RowDiv.className = 'row';
                    RowDiv.style.margin = '10px';
                    for (let i = 1; i <= 5; i++) {
                        if (c <= QuestionCount) {
                            let x = 5 * j - (5 - i);
                            const QuestionNumber = document.createTextNode(c.toString());
                            const QuestionDiv = document.createElement('div');
                            QuestionDiv.appendChild(QuestionNumber);
                            QuestionDiv.id = 'QNumber' + x;
                            QuestionDiv.className = 'btn btn-outline-dark rounded text-center';
                            QuestionDiv.onclick = () => {
                                this.InvokeQuestion(x)
                            };
                            QuestionDiv.style.margin = '10px';
                            QuestionDiv.style.width = '35px';
                            QuestionDiv.style.height = '35px';
                            RowDiv.appendChild(QuestionDiv);
                            c++;
                        } else
                            break;
                    }
                    MainDiv.appendChild(RowDiv);
                }
            }
        }
    };

    Submit() {

        let id = sessionStorage.getItem('ExamID');
        let ExamName = sessionStorage.getItem('ExamName');
        let Module = sessionStorage.getItem('Module');
        let StudentName = sessionStorage.getItem('UserName');
        let StudentID = sessionStorage.getItem('UserStudentID');


        if (this.state.AG) {
            this.AutoGrading().then((marksData) => {
                let SubmitMarks = {
                    ExamName: ExamName,
                    Module: Module,
                    StudentName: StudentName,
                    StudentID: StudentID,
                    ExamID: id,
                    Answers: this.state.AnswerSheet,
                    Marks: marksData.Marks
                };
                axios.post('http://localhost:4000/marks/', SubmitMarks, {withCredentials: true}).then((res) => {
                    alert(res.data);
                    alert("Exam Submitted. You'll be logged out now.");

                    sessionStorage.clear();
                    document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                    localStorage.removeItem('token');
                    window.open("../login", "_self");

                }).catch((err) => {
                    alert(err);
                })
            });

        } else {
            let SubmitMarks = {
                ExamName: ExamName,
                Module: Module,
                StudentName: StudentName,
                StudentID: StudentID,
                ExamID: id,
                Answers: this.state.AnswerSheet
            };
            axios.post('http://localhost:4000/marks/', SubmitMarks, {withCredentials: true}).then((res) => {
                alert(res.data);
                alert("Exam Submitted. You'll be logged out now.");

                sessionStorage.clear();
                document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                localStorage.removeItem('token');
                window.open("../login", "_self");

            }).catch((err) => {
                alert(err);
            })
        }
    }

    render() {
        return (
            <div>
                <h3><u>Online Exam</u></h3>
                <form>
                    <div id="QuestionNumbers" style={{marginTop: 50}}
                         className="border border-dark float-lg-left rounded"/>
                    <div className="container border border-light bg-dark text-light "
                         style={{marginTop: 50, width: 1000, height: 700}}>
                        <div style={{marginTop: 20, height: 500}} className="container border border-dark">
                            <div id="Question" style={{marginTop: 20, height: 200}}
                                 className="border text-justify border-light container "/>
                            <div id="Answers" style={{marginTop: 20, height: 200}}
                                 className="border border-light container">
                                <table>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <div id="Answer1Div"/>
                                        </td>
                                        <td>
                                            <input type="radio" id="Answer1" name="Answer" value="1"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div id="Answer2Div"/>
                                        </td>
                                        <td>
                                            <input type="radio" id="Answer2" name="Answer" value="2"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div id="Answer3Div"/>
                                        </td>
                                        <td>
                                            <input type="radio" id="Answer3" name="Answer" value="3"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div id="Answer4Div"/>
                                        </td>
                                        <td>
                                            <input type="radio" id="Answer4" name="Answer" value="4"/>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <input type="button" value="Submit answer" onClick={() => {
                            this.AddAnswer()
                        }} className="btn btn-primary"/>
                        <input style={{margin: 10}} type="button" onClick={() => {
                            this.Submit()
                        }} value="Finish Answering" className="btn btn-danger"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default StudentAttemptExam;