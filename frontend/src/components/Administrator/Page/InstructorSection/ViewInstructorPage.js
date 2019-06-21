import React, {Component} from 'react';

import '../../Styles/PageStyle.css';


class ViewInstuctorPage extends Component {
    constructor(props){
        super(props);

        this.state={
            instructors:[]
        };
    }

    render() {

        return (
              <div  className="page_divStyle">
                  {console.log(this.state.admins)}
                  <h2 className="headStyle">Instructors</h2>
                  <div className="right-col">
                      <table className="page_layout">
                          <tbody>
                          <tr>
                              <td>
                                  <ul style={listStyle}>
                                      {this.state.admins.map(admin =>
                                          <li style={linkStyle} key={admin._id}><a href={'/profile/'.concat(admin._id)} >{admin.name}</a></li>
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
    fontSize:'18px',
    color:'Blue',
    textDecoration:'underline'
};

const listStyle={
    textAlign:'center',
    fontWeight:'bold',
    listStyleType:'none',
    top:'5px',
    left:'160px',
    position: 'absolute',


};
export default ViewAdminPage;