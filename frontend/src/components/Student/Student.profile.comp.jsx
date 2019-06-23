import React,{Component} from 'react';
import axios from 'axios';

export default class StudentProfile extends Component{

    constructor(props) {
        super(props);
        this.state = {
            Name: '',
            LastName: '',
            Email: '',
            Password: '',
            StudentId: ''
        };
    }


        componentWillMount(){
            let id = sessionStorage.getItem('UserID');

            // let id = "5d0c2a805bc6992e08a0ba1a";
            axios.get('http://localhost:4000/Students/'+id).then((res)=>{
                let resData = res.data;
                this.setState({
                    Name:resData.first_name,
                    LastName:resData.last_name,
                    Password:resData.password,
                    Email:resData.email,
                    StudentId:resData.studentId
                })
            })
        }

    render() {
        return (

            <div className='card'>
                <div className='card-header'>

                </div>
                <div className='card-body'>
                    <form className='form'>
                        <div className='form-group'>
                            <label>First Name : {this.state.Name} </label>
                        </div>
                        <div className='form-group'>
                            <label>Last Name : {this.state.LastName} </label>
                        </div>
                        <div className='form-group'>
                            <label>Password : {this.state.Password} </label>
                        </div>
                        <div className='form-group'>
                            <label>Email : {this.state.Email}</label>
                        </div>
                        <div className='form-group'>
                            <label>IT Number : {this.state.StudentId}</label>
                        </div>
                            <div className='form-group'>
                            <a className="btn btn-primary" href="#" role="button">Edit Profile</a>
                            </div>
                    </form>
                </div>
            </div>
        );
    }
}