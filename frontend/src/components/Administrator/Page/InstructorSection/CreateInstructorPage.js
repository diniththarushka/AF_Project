import React, {Component} from 'react';

import '../../Styles/PageStyle.css';

class CreateInstructorPage extends Component {
   constructor(props){
       super(props);
       this.state={
           _id:null
       }
   }

    render() {
        return (
         <div className="right-col">
            <div className="form_divStyle_CreateInstructor">
                <h2>Create New Instructor</h2>
                <div className="createIns_layout" style={{borderStyle:"solid",borderBottom:"none"}}>
                    <tbody style={{background:"orange",borderStyle:"solid"}}>
                    <tr><td colSpan="2"><h3 className="headStyle">Details of Instructor</h3></td></tr>
                    <tr>
                        <td>
                            <tr>
                                <td className="labelStyle" style={{width:'150px'}}>Name</td>
                                <td><input
                                    type="text"
                                    name="instructor"
                                />
                                </td>
                            </tr>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <tr  >
                                <td className="labelStyle" style={{width:'150px'}}>Email</td>
                                <td colSpan="1"><input
                                    type="text"
                                    name="email"
                                />
                                </td>
                            </tr>
                        </td>
                    </tr>

                       <tr >
                           <td>
                               <div style={{width:"693px"}}>
                                   <tr>
                                       <td className="labelStyle" style={{width:'150px'}}>Faculty</td>
                                       <td>
                                       <input type="radio" name="FB" value="Faculty of Business"/><label className='labelStyle'>Faculty of Business</label><br/>
                                       <input type="radio" name="FC" value="Faculty of Computing"/><label className='labelStyle'>Faculty of Computing</label><br/>
                                       <input type="radio" name="FE" value="Faculty of Engineering"/><label className='labelStyle'>Faculty Engineering</label><br/>
                                   </td>

                               </tr>

                               </div>
                           </td>
                       </tr><br/>
                    <tr >
                        <td>
                            <div style={{width:"693px"}}>
                                <tr>
                                    <td className="labelStyle" style={{width:'150px'}}>Modules</td>
                                    <td>

                                    </td>
                                </tr>

                            </div>
                        </td>
                    </tr>
                    </tbody>
                </div>
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
                            type="text"
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
    componentDidMount(){

    }
}

export default CreateInstructorPage;