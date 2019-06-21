import React, {Component} from 'react';
import axios from 'axios';

export default class AddAssignments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: '',
            Module: '',
            DueDate: '',
            Description: '',
            ModuleArray: []
        };
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeModule = this.onChangeModule.bind(this);
        this.onChangeDueDate = this.onChangeDueDate.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.setCurrentDate = this.setCurrentDate.bind(this);
    }

    componentWillMount() {
        let id = sessionStorage.getItem('UserID');
        //hardcoded value until login function integrated
        axios.get('http://localhost:4000/instructors/'+id,{withCredentials: true}).then((response) => {
            let resData = response.data;
            this.setState({
                ModuleArray: resData.Modules
            })

        }).catch((err) => {
            console.log('Error in fetching instructor for listing modules. Error: ' + err);
        })
    }

    onChangeName(e) {
        this.setState({
            Name: e.target.value
        })
    }

    onChangeModule(e) {
        this.setState({
            Module: e.target.value
        })
    }

    onChangeDueDate(e) {
        this.setState({
            DueDate: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            Description: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const Assignment = {
            Name:this.state.Name,
            Description:this.state.Description,
            Module: document.getElementById('module').value,
            DueDate:this.state.DueDate
        };
        axios.post('http://localhost:4000/assignments/',Assignment,{withCredentials: true}).then((res)=>{
            let ID = res.data.ID;
            axios.get('http://localhost:4000/modules/getByName/'+Assignment.Module,{withCredentials: true}).then((response)=>{
                let Module_ID = response.data.ID;
                axios.put('http://localhost:4000/modules/addAssignment/'+Module_ID,{Assignments:[ID]},{withCredentials: true})
            });
            alert(res.data.message);

        }).catch(()=>{
            alert('Please fill all the fields');
        });
        this.setState({
            Name: '',
            Module: '',
            DueDate: '',
            Description: '',
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

    render() {
        return (
            <div>
                <h3>Add an Assignment </h3>
                <br/>
                <div>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group row">
                            <label className="col-md-6 col-form-label">Name: </label>
                            <input type="text" placeholder="Assignment Name" value={this.state.Name} onChange={this.onChangeName}/>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-6 col-form-label">Module: </label>
                            <select id="module">
                                {
                                    this.state.ModuleArray.map((mod, i) => {
                                        return <option onChange={this.onChangeModule}  value={mod} key={i}>{mod}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-6 col-form-label">Due Date: </label>
                            <input type="date" className="date" value={this.state.DueDate} min={this.setCurrentDate()} onChange={this.onChangeDueDate}/>
                        </div>
                        <div className="input-group">
                            <label className="col-md-6 col-form-label">Description (for Students): </label>
                            <textarea className="form-control"
                                      placeholder="Assignment Description. Submission guidelines etc." value={this.state.Description} onChange={this.onChangeDescription}/>
                        </div>
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