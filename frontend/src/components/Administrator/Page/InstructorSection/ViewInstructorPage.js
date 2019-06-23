import React, {Component} from 'react';

import '../../Styles/PageStyle.css';
import {getInsList} from '../../Services/Ins.Service';

class ViewInstuctorPage extends Component {
    constructor(props){
        super(props);

        this.state={
             ins_id:null,
            instructors:[]
        };
    }

    render() {

        return (
            <div  className="page_divStyle">
                {console.log(this.state.instructors)}
                <h2 className="headStyle">Instructors</h2>

                <table className="page_layout">
                    <tbody>

                    <div style={{position:"absolute",left:"90px",top:"100px",background:"orange"}}>
                        <div className="viewScroller">
                            {<ul>
                                {  this.state.instructors.map(ins =>
                                    <a  href={'/Ins/'.concat(ins._id)} ><label style={linkStyle}>{ins.Name}</label><br/></a>
                                )
                                }
                            </ul>}
                        </div>
                    </div>

                    </tbody>
                </table>


            </div>
        );
    }
    componentWillMount() {
        getInsList().then(res=>{
            let instructors=res;
            console.log( instructors);
            console.log(typeof  instructors);
            this.setState({ instructors:instructors})

        })
    }
}
const linkStyle={
    fontSize:'20px',
    fontWeight:"Bold",
    color:'Black',
    textDecoration:'underline'
};


export default ViewInstuctorPage;