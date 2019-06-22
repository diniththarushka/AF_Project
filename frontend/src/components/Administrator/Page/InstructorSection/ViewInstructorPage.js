// import React, {Component} from 'react';
//
// import '../../Styles/PageStyle.css';
// import {getInsList} from '../../Admin.Service';
//
// class ViewInstuctorPage extends Component {
//     constructor(props){
//         super(props);
//
//         this.state={
//             instructors:[]
//         };
//     }
//
//     render() {
//
//         return (
//               <div  className="page_divStyle">
//                   {console.log(this.state.admins)}
//                   <h2 className="headStyle">Instructors</h2>
//                   <div className="right-col">
//                       <table className="page_layout">
//                           <tbody>
//                           <tr>
//                               <td>
//                                   <ul style={listStyle}>
//                                       {this.state.instructors.map(admin =>
//                                           <li style={linkStyle} key={admin._id}><a href={'/profile/'.concat(admin._id)} >{admin.name}</a></li>
//                                       )
//                                       }
//                                   </ul>
//                               </td>
//                           </tr>
//
//                           </tbody>
//                       </table>
//
//                   </div>
//               </div>
//         );
//     }
//     componentWillMount() {
//         getInsList().then(res=>{
//             let instructors=res;
//             console.log( instructors);
//             console.log(typeof  instructors);
//             this.setState({ instructors:instructors})
//
//         })
//     }
// }
// const linkStyle={
//     fontSize:'18px',
//     color:'Blue',
//     textDecoration:'underline'
// };
//
// const listStyle={
//     textAlign:'center',
//     fontWeight:'bold',
//     listStyleType:'none',
//     top:'5px',
//     left:'160px',
//     position: 'absolute',
//
//
// };
// export default ViewInstuctorPage;