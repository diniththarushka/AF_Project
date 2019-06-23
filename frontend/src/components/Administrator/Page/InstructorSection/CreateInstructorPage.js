import React, {Component} from 'react';

import '../../Styles/PageStyle.css';

import {sendEmailToIns,registerIns} from '../../Services/Ins.Service';

let ins=[];
let m=[];
let f=[];

export const CheckBox = props => {
    const {module, onSelection} = props;
    return (
        <div>
            <input key={module.id} onClick={onSelection} value={module.value} type="checkbox"/>
            <label className='labelStyle'>{module.name}</label><br/>
        </div>
    );
};

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
            Faculty:[],
            Modules:[],
            moduleList: [
                {id:"1", value:"Software Architecture", name:"Software Architecture"},
                {id:"2", value:"Distributed Systems", name:"Distribued Systems"},
                {id:"3", value:"Application Frameworks" ,name:"Application Frameworks"},
                {id:"4", value:"SEQPM", name:"SEQPM"}
            ]

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
            Faculty:e.target.value
        });
        return e.target.value;
    }



    onSelection(event)
    {
        if(event.target.checked){

            if (!this.state.Modules.find(module => module === event.target.value)) {
                this.setState({
                    Modules: this.state.Modules.concat(event.target.value)
                });
            }


        }else {

            let Modules = [...this.state.Modules];
            let index = Modules.indexOf(event.target.value);
            Modules.splice(index, 1);
            this.setState({Modules: Modules});
        }


    }

    onClick(e){

        console.log(this.state.instructor);
        ins=this.state.instructor;
        f.push(this.state.Faculty);
        m=this.state.Modules;

        let sender={
            email:"mkvathanan@gmail.com",
            password:"Vathanan123"
        };
        let reciever={
            email:this.state.instructor.Email,
            password:this.state.instructor.Password,
            userRole:"Instructor"
        };


        registerIns(ins,f,m).then(res=>{
            console.log(res.data);
        });

        sendEmailToIns(sender,reciever).then((res)=>{console.log(res.data)})
        // window.location.href="/home/".concat(this.state._id);
        // this.props.history.push("/createAdminAccount");
    }
    render() {
        return (
            <div className="right-col_1">
                {console.log(this.state.instructor)}
                {console.log(this.state.Faculty)}
                {console.log(typeof  this.state.Faculty)}
                {console.log(this.state.Modules)}
                {console.log(typeof  this.state.Modules)}
                <div className="form_divStyle_CreateInstructor">
                    <h2 style={{height:"50px",position:"absolute",left:"300px"}}>Create New Instructor</h2>
                    <table className="createIns_layout" >
                        <tbody style={{background:"orange",borderStyle:"solid",borderColor:"black"}}>
                        <tr className="cellHeight" style={{height:"50px"}}><td colSpan="2"><h3 className="headStyle">Instructor Details</h3></td></tr>
                        <tr>
                            <td className="cellHeight"><label className="labelStyle" style={{fontSize:"22px"}}>Name</label></td>
                            <td className="cellHeight"><input
                                type="text"
                                name="Name"
                                onChange={this.onChange}
                            />
                            </td>
                        </tr>
                        <tr className="cellHeight">
                            <td><label className="labelStyle" style={{fontSize:"22px"}}>Email</label></td>
                            <td><input
                                type="text"
                                name="Email"
                                onChange={this.onChange}
                            />
                            </td>
                        </tr>
                        <tr >
                            <td colSpan="2">

                                <div style={{position:"absolute",left:"10px",textAlign:"center", top:"200px"}}>
                                    <label style={{left:"10px" ,fontSize:"22px",fontWeight:"bold"}}>Choose Faculty</label><br/>

                                    <div style={{textAlign:"left",top:"10px"}}>
                                        <input  type="radio"
                                                value="Faculty of Business"
                                                checked={this.state.Faculty === "Faculty of Business"}
                                                onChange={this.handleChange}
                                        /> <label className='labelStyle'>Faculty of Business</label><br/>
                                        <input
                                            type="radio"
                                            value="Faculty of Computing"
                                            checked={this.state.Faculty === "Faculty of Computing"}
                                            onChange={this.handleChange}
                                        /><label className='labelStyle'>Faculty of Computing</label><br/>
                                        <input
                                            type="radio"
                                            value="Faculty of Engineering"
                                            checked={this.state.Faculty === "Faculty of Engineering"}
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
                                        {
                                            this.state.moduleList.map((module) => {
                                                return ( <CheckBox module={module}  onSelection={this.onSelection}/> )
                                            })
                                        }

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
                                name="Username"
                                onChange={this.onChange}
                            />
                            </td>
                        </tr>
                        <tr>
                            <td><label className="labelStyle">Password</label></td>
                            <td><input
                                type="password"
                                name="Password"
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
