import React,{Component} from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';

export default class RegisterInstructorComp extends Component {

    constructor(props){
        super(props);

        this.state={
            Name:'',
            Email:'',
            Password:'',
            Faculty:[],
            Modules:[]
        };

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeName(e){
        this.setState({
            Name:e.target.value
        })
    }

    onChangeEmail(e){
        this.setState({
            Email:e.target.value
        })
    }

    onChangePassword(e){
        this.setState({
            Password:e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
        let SaltRounds = 3;
        let Instructor;
        let ModArr=[];
        let FacArr=[];

        bcrypt.hash(this.state.Password,SaltRounds,(err,hashed)=>{
            if(err){
                console.log(err);
            }else{
                let nListFac = document.getElementsByName('faculty');
                nListFac.forEach((node)=>{
                    if(node.checked)
                    FacArr.push(node.value);
                });
                let nListMod = document.getElementsByName('module');
                nListMod.forEach((node)=>{
                    if(node.checked)
                        ModArr.push(node.value);
                });
                Instructor={
                    Name:this.state.Name,
                    Email:this.state.Email,
                    Password:hashed,
                    Faculty:FacArr,
                    Modules:ModArr
                };
                axios.post('http://localhost:4000/instructors/',Instructor,{withCredentials: true}).then((res)=>{
                    alert(res.data);

                    this.setState({
                        Name:'',
                        Email:'',
                        Password:'',
                        Faculty:[],
                        Modules:[]
                    })
                }).catch((err)=>{
                    alert(err);
                })
            }
        });


    }

    render() {
        return (
            <div className="container bg-dark text-light rounded" style={{marginTop:50,width:700}}>
                <h3><u>Register Instructor</u></h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group row">
                        <label className="col-md-6 col-form-label">Name: </label>
                        <input type="text" placeholder="Name" value={this.state.Name} required={true} onChange={this.onChangeName}/>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-6 col-form-label">E-mail: </label>
                        <input type="email" placeholder="abc@mail.com" value={this.state.Email} required={true} onChange={this.onChangeEmail}/>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-6 col-form-label">Password: </label>
                        <input type="password" placeholder="******" value={this.state.Password} required={true} onChange={this.onChangePassword}/>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-6 col-form-label">Faculty: </label>
                        <input type="checkbox" name="faculty" value="Faculty of Computing"/>Computing<br/>
                        <input type="checkbox" name="faculty" value="Faculty of Business"/>Business<br/>
                        <input type="checkbox" name="faculty" value="Faculty of Engineering"/>Engineering<br/>
                        <input type="checkbox" name="faculty" value="Other Faculty"/>Other<br/>
                    </div>
                    <div className="form-group row">

                        <label className="col-md-6 col-form-label">Modules: </label>
                        <input type="checkbox" name="module" value="Application Frameworks"/>AF<br/>
                        <input type="checkbox" name="module" value="Software Architecture"/>SA<br/>
                        <input type="checkbox" name="module" value="Distributed Systems"/>DS<br/>
                        <input type="checkbox" name="module" value="Software Engineering Process and Quality Management"/>SEPQM<br/>

                    </div>
                    <div className="form-group row" style={{marginLeft:350}}>
                        <input type="submit" value="Submit" className="btn btn-outline-primary"/>
                    </div>
                </form>
            </div>
        );
    }
}