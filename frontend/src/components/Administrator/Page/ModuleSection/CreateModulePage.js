import React, {Component} from 'react';


export const CheckBox = props => {
    const {instructor, onSelection} = props;
    return (
        <div>
            <input key={instructor.id} onClick={onSelection} value={instructor.value} type="checkbox"/>
            <label className='labelStyle'>{instructor.name}</label><br/>
        </div>
    );
};

class CreateModulePage extends Component {
    constructor(props){
        super(props);
        this.state={
            module:{
                Name:null,
                EnrollmentKey:null,
                Year:null,
                Semester:null,

            },
            Faculty:[],
            Instructors:[],
            InsList: [
                {id:"1", value:"John Wick", name:"John Wick"},
                {id:"2", value:"Peter Parker", name:"Peter Parker"},
                {id:"3", value:"Bruce Banner" ,name:"Bruce Banner"},
                {id:"4", value:"Jacob Bruce", name:"Jacob Bruce"}
            ]
        };

        this.onChange=this.onChange.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.onSelection=this.onSelection.bind(this);

        this.onClick=this.onClick.bind(this);


    }
    onChange(e){
        const {module}=this.state;
        const currentState= module;
        const {name,value}=e.target;
        currentState[name]=value;
        this.setState({
            module:currentState
        });

    }


    handleChange(e) {
        let Faculty=[]
        this.setState({
            Faculty:e.target.value
        });
        return e.target.value;
    }

    onSelection(event)
    {
        if(event.target.checked){

            if (!this.state.Instructors.find(instructor => instructor === event.target.value)) {
                this.setState({
                    Instructors: this.state.Instructors.concat(event.target.value)
                });
            }


        }else {

            let Instructors = [...this.state.Instructors];
            let index = Instructors.indexOf(event.target.value);
            Instructors.splice(index, 1);
            this.setState({Instructors: Instructors});
        }


    }
    onClick(e){
        let f=[];
        f.push(this.state.Faculty);
        // console.log(f);
        // console.log(typeof f);
        let i=this.state.Instructors;
        // console.log(i);
        // console.log(typeof i);
        let m=this.state.module;
        console.log(i);
        console.log(typeof m);

    }
    render() {
        return (
            <div>
                <div  className="form_divStyle_CreateModule">
                    {console.log(this.state.instructor)}
                    {console.log(this.state.Instructors)}
                    {console.log(typeof this.state.Instructors)}
                    {console.log(this.state.Faculty)}
                    {console.log(typeof this.state.Faculty)}

                    <h2>Create New Module</h2>
                    <table className="createMod_layout">
                        <tbody style={{background:"orange",borderStyle:"solid",borderColor:"black",borderBottom:"none"}}>
                        <tr><td colSpan="2"><h3 className="headStyle">Details of Module</h3></td></tr>
                        <tr>
                            <td><label className="labelStyle">Name</label></td>
                            <td><input
                                type="text"
                                name="Name"
                                onChange={this.onChange}
                            />
                            </td>
                        </tr>
                        <tr>
                            <td><label style={{fontWeight:"bold",fontSize:"17px"}}>Enrollment key</label></td>
                            <td><input
                                type="text"
                                name="EnrollmentKey"
                                onChange={this.onChange}
                            />
                            </td>
                        </tr>
                        <tr>
                            <td style={{height:"70px"}}><label style={{fontWeight:"bold",fontSize:"17px"}}>Year</label></td>
                            <td><select style={{width:"800px",height:"40px"}}
                                        name="Year"
                                        onChange={this.onChange}

                            >
                                <option value="null" disabled selected>Choose Year ...</option>
                                <option value="1">Year 1</option>
                                <option value="2">Year 2</option>
                                <option value="3">Year 3</option>
                                <option value="4">Year 4</option>
                            </select>
                            </td>
                        </tr>
                        <tr  style={{top:"300px"}}>
                            <td><label className="labelStyle">Semester</label></td>
                            <td>
                                <td><select style={{width:"800px",height:"40px"}}
                                            name="Semester"
                                            onChange={this.onChange}
                                >
                                    <option  value="null" disabled selected>Choose Semester ...</option>
                                    <option value="1">Semester 1</option>
                                    <option value="2">Semester 2</option>
                                </select>
                                </td>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table className="createAccount_layout_3">
                        <tbody style={{background:"orange",borderStyle:"solid",borderColor:"black"}}>
                        <tr style={{height:"50px"}}><td ><label className="labelStyle">Choose Faculty</label></td></tr>
                        <tr>
                            <td>
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
                                        onChange={this. handleChange}
                                    /><label className='labelStyle'>Faculty of Engineering</label><br/>

                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <table className="createAccount_layout_4">
                    <tbody style={{background:"orange",borderStyle:"solid",borderColor:"black"}}>
                    <tr style={{height:"50px"}}><td ><label className="labelStyle">Assign Instructors</label></td></tr>
                    <tr>
                        <td colSpan="1">

                            <div style={{position:"absolute",top:"60px", left:"11px"}}>
                                <label style={{left:"10px" ,fontSize:"19px",fontWeight:"bold"}}>Instructors</label><br/>
                                <div className="scroller">
                                    {
                                        this.state.InsList.map((instructor) => {
                                            return ( <CheckBox instructor={instructor}  onSelection={this.onSelection}/> )
                                        })
                                    }

                                </div>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div className="btn_layout">
                    <button style={{right:"380px"}} className="button" onClick={this.onClick}>Create Module</button>
                </div>
            </div>
        );
    }
}

export default CreateModulePage;