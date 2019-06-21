import React, {Component} from 'react';

import '../../Styles/PageStyle.css';

class CreateInstructorPage extends Component {
   constructor(props){
       super(props);
       this.state={
           _id:null,
          instructor:{
                name:null,
                email:null,
                faculty:null,
                modules:[],
                username:null,
                password:null,
          }

       };
       this.onChange=this.onChange.bind(this);
       this.handleChange=this.handleChange.bind(this);
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
    render() {
        return (
         <div className="right-col_1">
             {console.log(this.state.instructor)}
            <div className="form_divStyle_CreateInstructor">
                <h2>Create New Administrator</h2>
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
                                            checked={this.state.instructor.faculty === "Faculty of Business"}
                                            onChange={this.handleChange}
                                    /> <label className='labelStyle'>Faculty of Business</label><br/>
                                    <input
                                        type="radio"
                                        value="Faculty of Computing"
                                        checked={this.state.instructor.faculty === "Faculty of Computing"}
                                        onChange={this.handleChange}
                                    /><label className='labelStyle'>Faculty of Computing</label><br/>
                                    <input
                                        type="radio"
                                        value="Faculty of Engineering"
                                        checked={this.state.instructor.faculty === "Faculty of Engineering"}
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
                                    <input type="checkbox"/> <label className='labelStyle'>Software Architecture</label><br/>
                                    <input type="checkbox"/><label className='labelStyle'>Distributed Systems</label><br/>
                                    <input type="checkbox"/><label className='labelStyle'>Application Frameworks</label><br/>
                                    <input type="checkbox"/><label className='labelStyle'>Employability Skills Development</label><br/>
                                    <input type="checkbox"/><label className='labelStyle'>SEQPM</label><br/>
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

    }
}

export default CreateInstructorPage;