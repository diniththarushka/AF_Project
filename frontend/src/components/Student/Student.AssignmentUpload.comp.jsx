import React, {Component} from 'react';
import axios from 'axios';


export default class StudentAssignmentUploadComp extends Component{

    constructor(props){
        super(props);


        this.state={

            subLink:'',
            assignments:'',
            assignmentArray:[]
        };

        this.onChangeLink = this.onChangeLink.bind(this);
        this.onChangeAssignment= this.onChangeAssignment.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    componentWillMount() {
        let id = sessionStorage.getItem('UserID');

        axios.get('http://localhost:4000/assignments/'+id,{withCredentials: true}).then((response) => {
            let resData = response.data;
            this.setState({
                assignmentArray: resData.Assignment
            })

        }).catch((err) => {
            console.log('Error in fetching instructor for listing modules. Error: ' + err);
        })
    }
    onChangeLink(e) {
        this.setState({
            subLink: e.target.value
        })
    }
    onChangeAssignment(e){
        this.setState({
            assignments:e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();

        const File = {
            subLink:this.state.subLink,
            assignments: document.getElementById('assignment').value,

        }
        axios.post('http://localhost:4000/assignments/',File).then(resolve=>{
            console.log(resolve.data.data);


            this.setState({
                subLink:''

            })
        }).catch(err=>{
            console.log(err)
        })

    }

    render() {
        return(

            <div>
                <h3>Add Assignments </h3>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>


                <div>
                    <form onSubmit={this.onSubmit}>

                        <div className="form-group row">
                            <label className="col-md-6 col-form-label">Assignments</label>

                            <select className="col-md-6 col-form-label">
                                {
                                    this.state.assignmentArray.map((mod, i) => {
                                        return <option onChange={this.onChangeAssignment}  value={mod} key={i}>{mod}</option>
                                    })
                                }
                            </select>
                        </div>

                        <div className="form-group row">
                            <label className="col-md-6 col-form-label">Submission Link: </label>
                            <input type="text" placeholder="Assignment Link" value={this.state.subLink} onChange={this.onChangeLink}/>
                        </div>


                        <br/>
                        <br/>
                        <div className="input-group">
                            <div className="col-md-8">
                                <input type="submit" className="btn btn-primary" value="Submit"/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }


}