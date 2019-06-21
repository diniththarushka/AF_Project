import React, {Component} from 'react';

import '../../Styles/PageStyle.css';

import {getAdminList} from '../../Admin.Service';

class ViewAdminPage extends Component {
    constructor(props){
        super(props);

        this.state={
            admins:[]
        };
    }

    render() {

        return (
              <div  className="page_divStyle">
                  {console.log(this.state.admins)}
                  <h2 className="headStyle">Administrators</h2>

                      <table className="page_layout">
                          <tbody>
                          <div style={{position:"absolute",left:"90px",top:"100px",background:"orange"}}>
                              <div className="viewScroller">
                                  {<ul>
                                      {  this.state.admins.map(admin =>
                                          <a  href={'/profile/'.concat(admin._id)} ><label style={linkStyle}>{admin.name}</label><br/></a>
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
        getAdminList().then(res=>{
            let admins=res;
            console.log(admins);
            console.log(typeof admins);
            this.setState({admins:admins})

        })
    }
}

const linkStyle={
    fontSize:'20px',
    fontWeight:"Bold",
    color:'Black',
    textDecoration:'underline'
};

const listStyle={
    // textAlign:'center',
    fontWeight:'bold',
    listStyleType:'none',
    top:'25px',
    left:'180px',
    position: 'absolute',


};
export default ViewAdminPage;