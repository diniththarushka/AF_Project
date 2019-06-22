import React, {Component} from 'react';
import axios from 'axios';

const Marks = (props) => (
    <tr>
        <td>{props.mark.ExamName}</td>
        <td>{props.mark.Module}</td>
        <td>{props.mark.StudentName}</td>
        <td>{props.mark.StudentID}</td>
        <td>{props.mark.Marks}</td>
    </tr>
);
export default class ViewMarks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Marks: []
        }
    }

    componentWillMount() {
        axios.get('http://localhost:4000/marks/',{withCredentials:true}).then((res) => {
            this.setState({
                Marks: res.data
            })
        })
    }

    populateTable() {
        return this.state.Marks.map((mark, i) => {
            return (<Marks mark={mark} key={i}/>)
        })
    }

    render() {
        return (
            <div>
                <h3>Marks Overview</h3>
                <div>
                    <table className="table-hover">
                        <thead>
                        <tr>
                            <th>Exam</th>
                            <th>Module</th>
                            <th>Student Name</th>
                            <th>Student ID</th>
                            <th>Marks</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.populateTable()
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}