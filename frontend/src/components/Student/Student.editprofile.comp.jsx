import React,{Component} from 'react';
import axios from 'axios';

export default class InsEditProfile extends Component{

    constructor(props){
        super(props);
        this.state={
            FirstName:'',
            LastName:'',
            Password:'',
            Email:'',
            StudentId:'',
        };

        this.updateStatus = this.updateStatus.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeStudentId = this.onChangeStudentId.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
        let id = sessionStorage.getItem('UserID');

        axios.get('http://localhost:4000/Students/'+id).then((res)=>{
            let resData = res.data;
            this.setState({
                Updated:false,
                FirstName:resData.first_name,
                LastName:resData.last_name,
                Email:resData.email,
                Password:resData.password,
                StudentId:resData.studentId

            })
        })
    }

    updateStatus(){
        this.setState({
            Updated:true
        })
    }
    onChangeFirstName(e){
        this.updateStatus();
        this.setState({
            FirstName:e.target.value
        })
    }

    onChangeLastName(e){
        this.updateStatus();
        this.setState({
            LastName:e.target.value
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
            let UpdateStudentObj = {
                first_name:this.state.FirstName,
                last_name:this.state.LastName,
                email:this.state.Email,
                password: this.state.Password,
                studentId:this.state.StudentId


            };
            axios.put('http://localhost:4000/Students/update/'+id,UpdateStudentObj).then((res)=>{
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
                            <label className="col-md-6 col-form-label">First Name: </label>
                            <input type="text" value={this.state.FirstName} onChange={this.onChangeFirstName}/>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-6 col-form-label">Last Name: </label>
                            <input type="text" value={this.state.LastName} onChange={this.onChangeLastName}/>
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