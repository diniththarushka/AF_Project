import React,{Component} from 'react';

import '../../Styles/PageStyle.css';



import Role from '../../Image/UserRole.png';

import {getProfile} from '../../Admin.Service';

class ProfilePage extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            profile:null,
            name:null,
            date:null,
            contactNo:null,
            address:null,
            email:null
        };
        this.dateFormat=this.dateFormat.bind(this);
    }
   dateFormat=(date)=>{
        date=new Date(date);
        var dd = date.getDate();
        var mm = date.getMonth()+1; //January is 0!
        var yyyy = date.getFullYear();

        if(dd<10) {
            dd = '0'+dd
        }

        if(mm<10) {
            mm = '0'+mm
        }



        return  dd + '/' + mm + '/' + yyyy;

    };

    render(){
        return(
                <div className="profile_divStyle">
                    {console.log(this.state.profile)}
                    <table className="page_layout" >
                        <tbody>
                        <tr>
                            <td style={{textAlign:"center"}}><h2>User Profile</h2></td>
                        </tr>
                        <tr>
                            <div className="userPic"><img src={Role} width="120px" height="120px" alt="Role"/></div>
                        </tr><br/><br/><br/><br/><br/>
                        <tr className="cell">
                            <td >
                                <label><b>Name:</b></label><br/>
                            </td>
                            <td>
                                <label><b>{this.state.name}</b></label><br/>
                            </td>
                        </tr>
                        <tr className="cell">
                            <td >
                                <label><b>Date Created:</b></label><br/>
                            </td>
                            <td>
                                <label><b>{this.dateFormat(this.state.date)}</b></label><br/>
                            </td>
                        </tr>
                        <tr className="cell">
                            <td>
                                <label><b>Contact Number:</b></label><br/>
                            </td>
                            <td>
                                <label><b>{this.state.contactNo}</b></label><br/>
                            </td>
                        </tr>
                        <tr className="cell">
                            <td>
                                <label><b>Email:</b></label><br/>
                            </td>
                            <td>
                                <label><b>{this.state.email}</b></label><br/>
                            </td>
                        </tr>
                        <tr className="cell">
                            <td>
                                <label><b>Address:</b></label><br/>
                            </td>
                            <td>
                                <label><b>{this.state.address}</b></label><br/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

        );
    }
    componentWillMount() {
        let id=this.props.match.params.id;
        console.log(id);
        getProfile(id).then(res => {
            console.log(res.data);
            this.setState({profile:res.data});
            this.setState({name:res.data.name});
            this.setState({date:res.data.date});
            this.setState({contactNo:res.data.contactNo});
            this.setState({address:res.data.address});
            this.setState({email:res.data.email});
        })
    }
}


export default ProfilePage;