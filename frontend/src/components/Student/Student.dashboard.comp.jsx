import React,{Component} from 'react';
import axios from 'axios';

const DetailsAll = props => (
    <tr>
        <td><b>{props.detailsall.Name}</b></td>
        <td><b>{props.detailsall.Year }</b></td>
        <td><b>{props.detailsall.Semester }</b></td>
        <td><b>{props.detailsall.Faculty }</b></td>
        <td><button onClick={()=>{StudentDashboard.enrollStudent(props.detailsall._id,props.detailsall.Name,props.detailsall.EnrollmentKey)}} className='btn btn-success'>Enroll Me</button></td>
    </tr>
)


export default class StudentDashboard extends Component {

    constructor(props){
        super(props);

        this.state = {
            ModulesDt :[]};

    }

    static enrollStudent(Moduleid,ModuleName,EnKey){

        let enrollemtKeyValidation = prompt('Enter enrollment key for '+ModuleName+": ");

        if(enrollemtKeyValidation === EnKey){
            const id = sessionStorage.getItem('UserID');
            let Participant = {
                Participants:id
            };
            axios.put('http://localhost:4000/modules/addParticipant/'+Moduleid,Participant).then((res)=>{
                let ModuleNameObj={
                    Module:Moduleid
                };
                axios.put('http://localhost:4000/students/enroll/'+id,ModuleNameObj).then((res)=>{
                    alert('Module enrollment success');
                }).catch((err)=>{
                    alert('Module enrollment failed. Error: '+err);
                });
            }).catch((err)=>{
                alert(err);
            });
        }else
            alert('Enrollment key is incorrect.');
    }

    componentDidMount(){
        axios.get('http://localhost:4000/Modules/')
            .then(response => {
                this.setState({ ModulesDt : response.data});
            })
            .catch(function (error){
                console.log(error);
            })
    }

    allModules(){
        return this.state.ModulesDt.map(function(currentDetail ,i){
            return <DetailsAll detailsall = {currentDetail} key = {i} />
        });
    }

    render() {
        return (

            <div className="container">

                <h1><b><i> Modules </i></b></h1>

                <table className = "table table-bordered bg-light table-hover table-striped" style={{ marinTop:20}}>
                    <thead>
                    <tr>
                        <th><h2>Name</h2></th>
                        <th><h2>Year</h2></th>
                        <th><h2>Semester</h2></th>
                        <th><h2>Faculty</h2></th>
                        <th><h2>Enroll for module</h2></th>
                    </tr>

                    </thead>
                    <tbody>
                    {this.allModules()}
                    </tbody>
                    <br/>
                    <br/>
                </table>
            </div>

        );


    }

}
