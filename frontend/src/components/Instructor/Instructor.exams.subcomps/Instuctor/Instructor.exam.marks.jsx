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
        let id=sessionStorage.getItem('UserID');
        axios.get('http://localhost:4000/instructors/'+id).then((res)=>{
            let Array=res.data.Modules;
            Array.forEach((module)=>{
                axios.get('http://localhost:4000/marks/byModule/'+module,{withCredentials:true}).then((resp) => {
                    this.setState({
                        Marks: this.state.Marks.concat(resp.data)
                    });
                })
            });

        });


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