import React,{Component} from 'react';
import axios from 'axios';

export default class InstructorEditProfile extends Component{

    constructor(props){
        super(props);
        this.state={
            Name:'',
            Email:'',
            Password:'',
            Module:[],
            Faculty:[]
        };
        this.updateStatus = this.updateStatus.bind(this);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
       let id = sessionStorage.getItem('UserID');

       axios.get('http://localhost:4000/instructors/'+id).then((res)=>{
           let resData = res.data;
           this.setState({
               Updated:false,
               Name:resData.Name,
               Email:resData.Email,
               Module:resData.Modules,
               Faculty:resData.Faculty
           })
       })
    }

    updateStatus(){
        this.setState({
            Updated:true
        })
    }
    onChangeName(e){
        this.updateStatus();
        this.setState({
            Name:e.target.value
        })
    }

    onChangeEmail(e){
        this.updateStatus();
        this.setState({
            Email:e.target.value
        })
    }

    onChangePassword(e){
        this.updateStatus();
        this.setState({
            Password:e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
        let id = sessionStorage.getItem('UserID');

        if(this.state.Updated){
            let UpdateInsObj = {
                Name:this.state.Name,
                Email:this.state.Email,
                Password:this.state.Password
            };
            axios.put('http://localhost:4000/instructors/update/'+id,UpdateInsObj).then((res)=>{
                alert(res.data);
            }).catch((err)=>{
                alert('Error'+err);
            })
        }else
            alert('You must make changes to update.');
    }

    render() {
        return (
            <div className="col-sm bg-dark text-light rounded" style={{marginTop:30}}>
                <h3><u>Edit My Profile</u></h3>

                <div className="container" style={{marginTop:50}}>
                    <form className="form-group" onSubmit={this.onSubmit}>
                        <div className="form-group row">
                        <label className="col-md-6 col-form-label">Name: </label>
                        <input type="text" value={this.state.Name} onChange={this.onChangeName}/>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-6 col-form-label">Email: </label>
                            <input type="email" value={this.state.Email} onChange={this.onChangeEmail}/>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-6 col-form-label">Password: </label>
                            <input type="password" value={this.state.Password} onChange={this.onChangePassword} placeholder="*******"/>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-6 col-form-label">Module(Update access denied): </label>
                            <select>
                                {
                                    this.state.Module.map((module,i)=>{
                                        return(<option key={i} value={module}>{module}</option>)
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-6 col-form-label">Faculty(Update access denied): </label>
                            <select>
                                {
                                    this.state.Faculty.map((module,i)=>{
                                        return(<option key={i} value={module}>{module}</option>)
                                    })
                                }
                            </select>
                        </div>
                        <div className="container">
                            <input type="submit" className="btn btn-primary" value="Update"/>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}