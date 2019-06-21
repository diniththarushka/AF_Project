import React,{Component} from 'react';
import axios from 'axios'

const Modules = (props)=>(
    <tbody>
        <tr>
            <td>{props.module.Name}</td>
            <td>{props.module.EnrollmentKey}</td>
            <td>{props.module.Year}</td>
            <td>{props.module.Semester}</td>
            <td>{props.module.Faculty}</td>
            <td>{props.module.Participants.length}</td>
            <td>{props.module.Assignments.length}</td>
        </tr>
    </tbody>
);

export default class InstructorModules extends Component{

    constructor(props){
        super(props);
        this.state = {
            Modules : []
        };

        this.mapModules = this.mapModules.bind(this);
    }

    componentWillMount() {

        axios.get('http://localhost:4000/modules/',{withCredentials: true}).then((response)=>{
            let ModuleData = response.data;

            this.setState({
                Modules : ModuleData
            })
        })
    }

    mapModules(){
        return this.state.Modules.map((module,i)=>{
            return <Modules module={module} key={i}/>
        })
    }

    render() {
        return (
            <div className="container bg-dark text-light rounded">
                <h3 style={{marginTop:50,marginBottom:20}}><u>Module Overview</u></h3>
                <table className="table table-hover text-light">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Enrollment Key</th>
                            <th>Year</th>
                            <th>Semester</th>
                            <th>Faculty</th>
                            <th>Participants</th>
                            <th>Assignments</th>
                        </tr>
                    </thead>
                    {this.mapModules()}
                </table>
            </div>
        );
    }
}