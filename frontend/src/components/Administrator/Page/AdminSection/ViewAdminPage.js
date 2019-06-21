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
                  <div className="right-col">
                      <table className="page_layout">
                          <tbody>
                          <tr>
                              <td>
                                  <ul style={listStyle}>
                                      {this.state.admins.map(admin =>
                                          <li style={linkStyle} key={admin._id}>
                                              <a  href={'/profile/'.concat(admin._id)} >{admin.name}</a>
                                        </li>
                                      )
                                      }
                                  </ul>
                              </td>
                          </tr>

                          </tbody>
                      </table>

                  </div>
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
    fontStyle:"Bold",
    color:'Blue',
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