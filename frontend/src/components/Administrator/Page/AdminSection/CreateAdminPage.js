import React, {Component} from 'react';

import  '../../Styles/PageStyle.css';


import {getProfile, registerAdmin} from '../../Services/Admin.Service';
import {sendEmailToAdmin} from '../../Services/Admin.Service';

const statement=(props)=>{
    console.log(props);
};

let admin=[];


class CreateAdminPage extends Component {
    constructor(props){
            super(props);
            this.state={
                _id:null,
                profile:null,
                admin:{
                    name:null,
                    email:null,
                    contactNo:null,
                    address:null,
                    username:null,
                    password:null
                }
            };
            this.onChange=this.onChange.bind(this);
            this.onClick=this.onClick.bind(this);
    }
    onChange(e){
        const { admin}=this.state;
        const currentState= admin;
        const {name,value}=e.target;
        currentState[name]=value;
        this.setState({
            admin:currentState
        });

    }
    onClick(e){

         console.log(this.state.admin);
         admin=this.state.admin;


         let sender={
             email:"mkvathanan@gmail.com",
             password:"Vathanan123"
         };
        let reciever={
            email:this.state.admin.email,
            password:this.state.admin.password,
            userRole:"Administrator"
        };


         registerAdmin(admin).then(res=>{
             console.log(res.data);
         });
        sendEmailToAdmin(sender,reciever).then((res)=>{console.log(res.data)})
        // window.location.href="/home/".concat(this.state._id);
    }
    render() {

        return (
                 <div>
                     {statement(this.state.admin)}

                    <div  className="form_divStyle">
                        <h2>Create New Administrator</h2>
                        <table className="createAdmin_layout">
                            <tbody style={{background:"orange",borderStyle:"solid",borderColor:"black",borderBottom:"none"}}>
                            <tr><td colSpan="2"><h3 className="headStyle">Details of Adminstrator</h3></td></tr>
                            <tr>
                                <td><label className="labelStyle">Name</label></td>
                                <td><input
                                    type="text"
                                    name="name"
                                    onChange={this.onChange}
                                />
                                </td>
                            </tr>
                            <tr>
                                <td><label className="labelStyle">Email</label></td>
                                <td><input
                                    type="text"
                                    name="email"
                                    onChange={this.onChange}
                                />
                                </td>
                            </tr>
                            <tr>
                                <td><label className="labelStyle">Contact Number</label></td>
                                <td><input
                                    type="text"
                                    name="contactNo"
                                    onChange={this.onChange}
                                />
                                </td>
                            </tr>
                            <tr>
                                <td><label className="labelStyle">Address</label></td>
                                <td>
                                    <textarea
                                        name="address" rows="2" cols="50"  onChange={this.onChange}/>
                               </td>
                            </tr>
                            </tbody>
                        </table>
                        <table className="createAccount_layout">
                            <tbody style={{background:"orange",borderStyle:"solid",borderColor:"black"}}>
                            <tr style={{height:"50px"}}><td colSpan="2"><h3 className="headStyle">Create New Account</h3></td></tr>
                            <tr>
                                <td><label className="labelStyle">Username</label></td>
                                <td><input
                                    type="text"
                                    name="username"
                                    onChange={this.onChange}
                                />
                                </td>
                            </tr>
                            <tr>
                                <td><label className="labelStyle">Password</label></td>
                                <td><input
                                    className='pwd'
                                    type="password"
                                    name="password"
                                    onChange={this.onChange}
                                />
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="btn_layout">
                        <button className="button" onClick={this.onClick}>Register</button>
                    </div>
              </div>

        );
    }
    componentDidMount() {
        let id=this.props.match.params.id;
        console.log(id);
        getProfile(id).then(res => {
            console.log(res.data);
            this.setState({profile:res.data});
        });
        this.setState({_id:id});
    }
}

export default CreateAdminPage;