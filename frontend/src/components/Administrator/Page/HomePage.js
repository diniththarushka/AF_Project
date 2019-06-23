import React,{Component} from 'react';
import  '../Styles/HomeStyle.css';

import Role from '../Image/UserRole.png';

import {getProfile} from '../Services/Admin.Service';

class HomePage extends Component{
    constructor(props){
        super(props);
        this.state={
            profile:null,
            _id:null,
            name:null,

        };
        this.onHandleSelect=this.onHandleSelect.bind(this);
    }

    onHandleSelect(e)
    {
        console.log(e.target.value);
        window.location.href=e.target.value;

    }
    render()
    {
        return(

            <form>
                { console.log(this.state.profile)}
                <div  className="Home_divStyle">
                    <div className="user_layout">
                        <div className="userBody">
                            <tbody className="userCell">
                            <tr>
                                <td ><div><img src={Role} width="50px" height="50px" alt="Role"/></div></td>
                                <td >

                                    <select className="userOpt"
                                            name="aSection"
                                            onChange={this.onHandleSelect} >
                                        <option value="null" disabled selected>{"Welcome".concat(" "+this.state.name)}</option>
                                        <option value={"/profile/".concat(this.state._id)}>Admin Profile</option>
                                        <option value="/">Logout</option>
                                    </select>
                                </td>
                            </tr>
                            </tbody>
                        </div>
                    </div>

                    <div className="body_layout">
                        <h3>Administrator Section</h3>
                        <select className="select_layout_1"
                                name="aSection"
                                onChange={this.onHandleSelect} >
                            <option value="null" disabled selected>Administrator</option>
                            <option value={"/createAdmin/".concat(this.state._id)}>Create Administrator</option>
                            <option value={"/adminList/".concat(this.state._id)}>View Administrators</option>
                        </select><br/><br/><br/>
                        <h3>Instructor section</h3>
                        <select className="select_layout_2"
                             name="Isection"
                             onChange={this.onHandleSelect}
                        >
                            <option value="null" disabled selected>Instructor</option>
                            <option value={"/createIns/".concat(this.state._id)}>Create Instructor</option>
                            <option value={"/InsList/".concat(this.state._id)}>View Instructors</option>
                        </select><br/><br/><br/>
                        <h3>Module section</h3>
                        <select className="select_layout_3"
                                name="cSection"
                                onChange={this.onHandleSelect}
                        >
                            <option value="null" disabled selected>Module</option>
                            <option value={"/createModule/".concat(this.state._id)}>Create Module</option>
                            <option value="6">View Modules</option>
                        </select><br/>

                    </div>
                </div>
            </form>
        );
    }
    componentWillMount() {
        let id=this.props.match.params.id;
        getProfile(id).then(res => {
            console.log(res.data);
            this.setState({profile:res.data});
            this.setState({_id:res.data._id});
            this.setState({name:res.data.name});
        })

    }
}
export default HomePage;