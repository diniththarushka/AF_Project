import React,{Component} from 'react';

import '../../Styles/PageStyle.css';



import Role from '../../Image/UserRole.png';

import {getIns} from '../../Services/Ins.Service';
// import {getProfile} from "../../Services/Admin.Service";

class InstructorPage extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            profile:null,
            Name:null,
            Email:null,
            Faculty:[],
            Modules:[]
        };

    }

    render(){
        return(
            <div className="Instructor_divStyle">
                {console.log(this.state.profile)}
                {console.log(this.state.Name)}
                {console.log(this.state.Modules[1])}
                <table className="page_layout" >
                <tbody>
                <tr>
                <td style={{textAlign:"center",width:"20px"}}><h2>Instructor Profile</h2></td>
                </tr>
                <tr>
                <div className="userPic" style={{left:"220px"}}><img src={Role} width="120px" height="120px" alt="Role"/></div>
                </tr><br/><br/><br/><br/><br/>
                <tr className="cell">
                <td >
                <label><b>Name:</b></label><br/>
                </td>
                <td>
                <label><b>{this.state.Name}</b></label><br/>
                </td>
                </tr>
                <tr className="cell">
                <td >
                <label><b>Email:</b></label><br/>
                </td>
                <td>
                <label><b>{this.state.Email}</b></label><br/>
                </td>
                </tr>
                <label><b>Faculty:</b></label><br/>
                <tr className="cell">

                    <div className="viewScroller" style={{backgroundColor:"Orange"}}>
                        <br/>
                        <label><b>
                            <ul>
                                {
                                    this.state.Faculty.map(faculty=>{
                                        return <li style={ {listStyleType: "none" }}>{faculty}</li>
                                    })
                                }
                            </ul></b></label><br/>

                    </div>
                </tr>
                <label><b>Modules:</b></label><br/>
                <tr className="cell">

                    <div className="viewScroller" style={{backgroundColor:"Orange"}}>
                            <br/>
                            <label><b>
                                <ul>
                                    {
                                        this.state.Modules.map(module=>{
                                            return <li style={ {listStyleType: "none" }}>{module}</li>
                                        })
                                    }
                                </ul></b></label><br/>

                    </div>
                </tr>
                </tbody>
                </table>

            </div>


        );
    }
    componentWillMount() {
        let id=this.props.match.params.id;
        console.log(id);
        getIns(id).then(res => {
            // console.log(res.data);
            // console.log(res.data.Name);
            // console.log(res.data.Email);
            // console.log(res.data.Faculty);
            console.log( typeof  res.data.Faculty);
            console.log(res.data.Faculty);
            console.log( typeof res.data.Modules);
            this.setState({profile:res.data});
            this.setState({Name:res.data.Name});
            this.setState({Email:res.data.Email});
            this.setState({Faculty:res.data.Faculty});
            this.setState({Modules:res.data.Modules});
        });
    }
}


export default InstructorPage;