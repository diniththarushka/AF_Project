import React,{Component} from 'react';
import axios from 'axios';

export default class InstructorModuleUpdate extends Component{

    constructor(props){
        super(props);

        this.state={
            ID:'',
            Modules:[],
            Assignment:[],
            Name:'',
            Module:'',
            DueDate:'',
            Description:''
        };
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDueDate = this.onChangeDueDate.bind(this);
        this.onChangeModule = this.onChangeModule.bind(this);

        this.setCurrentDate = this.setCurrentDate.bind(this);
        this.fillState = this.fillState.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
        let id = sessionStorage.getItem('UserID');

        axios.get('http://localhost:4000/assignments/').then((res)=>{
            this.setState({
                Assignment:res.data
            });
            axios.get('http://localhost:4000/instructors/'+id).then((res)=>{
                this.setState({
                    Modules:res.data.Modules
                });
            })

        }).catch((err)=>{
            console.log(err);
        })
    }

    onChangeName(e){
        this.setState({
            Name:e.target.value
        })
    }

    onChangeModule(e){
        this.setState({
            Module:e.target.value
        })
    }

    onChangeDueDate(e){
        this.setState({
            DueDate:e.target.value
        })
    }

    onChangeDescription(e){
        this.setState({
            Description:e.target.value
        })
    }

    fillState(id){
        axios.get('http://localhost:4000/assignments/'+id).then((res)=>{
            this.setState({
                ID:id,
                Name:res.data.Name,
                Module:res.data.Module,
                Description:res.data.Description,
            })
        })
    }

    setCurrentDate(){

        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1; // 0->January
        let yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd
        }
        if(mm<10){
            mm='0'+mm
        }

        today = yyyy+'-'+mm+'-'+dd;
        return today;
    }

    onSubmit(e){
        e.preventDefault();
        let ID =this.state.ID;

        let AssignmentObj = {
            Name:this.state.Name,
            Description:this.state.Description,
            Module: this.state.Module,
            DueDate:this.state.DueDate,
        };
        axios.put('http://localhost:4000/assignments/'+ID,AssignmentObj).then((res)=>{
            alert(res.data);
        }).catch((err)=>{
            alert(err);
        })
    }
    render() {
        return (
            <div>
                <h3>Update Assignment</h3>

                <div className="container">
                    <table style={{margin:'auto'}} className="table-hover" border="2px">
                        <thead>
                            <tr>
                                <td>Name</td>
                                <td>Module</td>
                                <td>Update</td>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.Assignment.map((assignment,i)=>{
                                return(
                                    <tr key={i}>
                                        <td>{assignment.Name}</td>
                                        <td>{assignment.Module}</td>
                                        <td><button className="btn btn-light" onClick={()=>{this.fillState(assignment._id)}}>Fill</button></td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>

                <div style={{marginTop:10}} className="container">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group row">
                            <label className="col-md-6 col-form-label">Name: </label>
                            <input type="text" className="rounded" value={this.state.Name} onChange={this.onChangeName}/>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-6 col-form-label">Module: </label>
                            <select id="module" onChange={this.onChangeModule}>
                                {
                                    this.state.Modules.map((mod, i) => {
                                        return <option   value={mod} key={i}>{mod}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-6 col-form-label">Due Date: </label>
                            <input type="date" required="required" className="rounded" value={this.state.DueDate} min={this.setCurrentDate()} onChange={this.onChangeDueDate}/>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-6 col-form-label">Description: </label>
                            <textarea className="rounded" value={this.state.Description} onChange={this.onChangeDescription}/>
                        </div>
                        <input type="submit" className="btn btn-primary" value="Update Assignment"/>
                    </form>
                </div>
            </div>
        );
    }
}