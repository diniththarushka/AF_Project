import React, {Component} from 'react';

import '../../Styles/PageStyle.css';

import {registerIns} from  '../../Ins.Service';

let ins={};
let modules={};
let faculty={};

class CreateInstructorPage extends Component {
   constructor(props){
       super(props);
       this.state={
           _id:null,
          instructor:{
                Name:null,
                Email:null,
                Username:null,
                Password:null
          },
           Faculty:null,
           Modules:[],

       };
       this.onChange=this.onChange.bind(this);
       this.handleChange=this.handleChange.bind(this);
       this.onSelection=this.onSelection.bind(this);

       this.onClick=this.onClick.bind(this);
   }
    onChange(e){
        const {instructor}=this.state;
        const currentState= instructor;
        const {name,value}=e.target;
        currentState[name]=value;
        this.setState({
            instructor:currentState
        });

    }

    handleChange(e) {
        this.setState({
            instructor:{faculty:e.target.value}
        });
    }

   onSelection()
    {
        let modules=[];
        var numberOfCheckedItems = 0;
        var checkboxes = document.getElementsByName("module");
        for(var i = 0; i < checkboxes.length; i++)
        {

            if(checkboxes[i].checked){
                // console.log(checkboxes[i]);
                // console.log("Status of "+checkboxes[i].value+": "+checkboxes[i].checked);
                // console.log("Checkbox ticked:"+checkboxes[i].value);
                modules.push(checkboxes[i].value);

            }else if(checkboxes[i].checked ===false){
                // console.log("Status of "+checkboxes[i].value+": "+checkboxes[i].checked);
                // console.log("Checkbox unticked:"+checkboxes[i].value);
                modules.pop(checkboxes[i].value);
            }
            console.log("modules["+i+"] ="+modules[i]);
            numberOfCheckedItems++;
        }
        this.setState({
             modules:modules
        });
    }

    onClick(e){

        console.log(this.state.instructor);
        ins=this.state.instructor;
        faculty=this.state.Faculty;
        modules=this.state.Modules;

        let sender={
            email:"mkvathanan@gmail.com",
            password:"Vathanan123"
        };
        let reciever={
            email:this.state.instructor.Email,
            password:this.state.instructor.Password,
            userRole:"Instructor"
        };


        registerIns(ins,faculty,modules).then(res=>{
            console.log(res.data);
        });
        // sendEmailToIns(sender,reciever).then((res)=>{console.log(res.data)})
        // window.location.href="/home/".concat(this.state._id);
        // this.props.history.push("/createAdminAccount");
    }
    render() {
        return (
         <div className="right-col_1">
             {console.log(this.state.instructor)}
             {console.log(this.state.faculty)}
             {console.log(this.state.Modules)}
            <div className="form_divStyle_CreateInstructor">
                <h2>Create New Instructor</h2>
                <table className="createIns_layout" >
                    <tbody style={{background:"orange",borderStyle:"solid",borderColor:"black"}}>
                    <tr className="cellHeight" style={{height:"50px"}}><td colSpan="2"><h3 className="headStyle">Instructor Details</h3></td></tr>
                    <tr>
                        <td className="cellHeight"><label className="labelStyle" style={{fontSize:"22px"}}>Name</label></td>
                        <td className="cellHeight"><input
                            type="text"
                            name="name"
                            onChange={this.onChange}
                        />
                        </td>
                    </tr>
                    <tr className="cellHeight">
                        <td><label className="labelStyle" style={{fontSize:"22px"}}>Email</label></td>
                        <td><input
                            type="text"
                            name="email"
                            onChange={this.onChange}
                        />
                        </td>
                    </tr>
                    <tr >
                        <td colSpan="2">

                            <div style={{position:"absolute",left:"10px",textAlign:"center", top:"200px"}}>
                                <label style={{left:"10px" ,fontSize:"22px",fontWeight:"bold"}}>Faculties</label><br/>

                                <div style={{textAlign:"left",top:"10px"}}>
                                    <input  type="radio"
                                            value="Faculty of Business"
                                            checked={this.state.faculty === "Faculty of Business"}
                                            onChange={this.handleChange}
                                    /> <label className='labelStyle'>Faculty of Business</label><br/>
                                    <input
                                        type="radio"
                                        value="Faculty of Computing"
                                        checked={this.state.faculty === "Faculty of Computing"}
                                        onChange={this.handleChange}
                                    /><label className='labelStyle'>Faculty of Computing</label><br/>
                                    <input
                                        type="radio"
                                        value="Faculty of Engineering"
                                        checked={this.state.faculty === "Faculty of Engineering"}
                                        onChange={this.handleChange}
                                    /><label className='labelStyle'>Faculty of Engineering</label><br/>

                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">

                            <div style={{position:"absolute", top:"370px",left:"21px"}}>
                                <label style={{left:"10px" ,fontSize:"22px",fontWeight:"bold"}}>Modules</label><br/>
                                <div className="scroller">
                                    <input name="module" value="Software Architecture" type="checkbox"
                                         onClick={this.onSelection}
                                    /> <label className='labelStyle'>Software Architecture</label><br/>
                                    <input name="module" value="Distributed Systems" type="checkbox"
                                           onClick={this.onSelection}
                                    /><label className='labelStyle'>Distributed Systems</label><br/>
                                    <input name="module" value="Application Frameworks"  type="checkbox"
                                           onClick={this.onSelection}
                                    /><label className='labelStyle'>Application Frameworks</label><br/>
                                    <input name="module" value="Employability Skills Development"   type="checkbox"
                                           onClick={this.onSelection}
                                    />
                                    <label className='labelStyle'>Employability Skills Development</label><br/>
                                    <input type="checkbox" name="module" value="SEQPM"
                                           onClick={this.onSelection}
                                    /><label className='labelStyle'>SEQPM</label><br/>
                                </div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <table className="createAccount_layout_2">
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
                            type="password"
                            name="password"
                            className="pwd"
                            onChange={this.onChange}
                        />
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="btn_layout" style={{top:"890px",left:"590px"}}>
                 <button className="button" onClick={this.onClick}>Register</button>
            </div>
           </div>
        );
    }
    componentDidMount(){
        let id=this.props.match.params.id;
        console.log(id);
        this.setState({_id:id})
    }
}

export default CreateInstructorPage;