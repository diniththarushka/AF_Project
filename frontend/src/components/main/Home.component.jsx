import React,{Component} from 'react';
import {BrowserRouter as Router,Route,Link} from "react-router-dom";
import LoginOthersComp from "../main/main.login.components/Login.others.comp";
import LoginAdminComp from "./main.login.components/Login.admin.comp";
import StudentRegisterComp from "./main.register.components/Student.register.comp";

import InstructorHome from '../Instructor/Instructor.Home.comp';
import StudentHome from '../Student/Student.home.comp';
import StudentAttemptExam from "../Student/Student.attempt.exam";
import AdminReactRoutes from "../Administrator/AdminReactRoutes";

export default class HomeHandler extends Component{

    constructor(props){
        super(props);

        this.buttonClickLogout = this.buttonClickLogout.bind(this);
        this.openUserPortal = this.openUserPortal.bind(this);
    }

    openUserPortal(){
        if(sessionStorage.getItem('UserType')){
            let Type = sessionStorage.getItem('UserType');

            if(Type === 'Instructor'){
                window.open("/Instructor/","_self");
            }else if(Type === 'Student'){
                window.open("/Student/","_self");
            }
        }else{
            alert('Welcome, to have more access you should login.');
            window.open("/login","_self");
        }
    }

    buttonClickLogout(){
        sessionStorage.clear();
        document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        localStorage.removeItem('token');
        window.open("/login","_self");
    }

    componentDidMount() {
        let LoginStatDiv = document.getElementById('LoginStat');
        if(!sessionStorage.getItem('UserID')){
            let LoginListItem =  document.createElement('li');
            let LoginText = document.createTextNode('Login');
            let LinkTag = document.createElement('a');
            LoginListItem.setAttribute('class','navbar-item');
            LinkTag.setAttribute('href','/login');
            LinkTag.setAttribute('class','nav-link');
            LinkTag.appendChild(LoginText);

            let AdminLoginListItem =  document.createElement('li');
            let AdminLoginText = document.createTextNode('Admin Login');
            let AdminLinkTag = document.createElement('a');
            AdminLoginListItem.setAttribute('class','navbar-item');
            AdminLinkTag.setAttribute('href','/admin');
            AdminLinkTag.setAttribute('class','nav-link');
            AdminLinkTag.appendChild(AdminLoginText);

            LoginListItem.appendChild(LinkTag);
            AdminLoginListItem.appendChild(AdminLinkTag);
            LoginStatDiv.appendChild(LoginListItem);
            LoginStatDiv.appendChild(AdminLoginListItem);

        }else{
            let UserName = sessionStorage.getItem('UserName');
            let SubStrings = UserName.split(' ');
            let name = SubStrings[0];

            let ListItem =  document.createElement('li');
            let ListItemBtn =  document.createElement('li');
            ListItem.setAttribute('class','nav-link');
            let ParagraphTag = document.createElement('p');
            let WelcomeText = document.createTextNode('Welcome, '+name);
            ParagraphTag.appendChild(WelcomeText);

            ListItemBtn.setAttribute('class','nav-link');
            let LogoutBtn = document.createElement('input');
            LogoutBtn.setAttribute('class','btn btn-outline-light');
            LogoutBtn.setAttribute('type','button');
            LogoutBtn.onclick = ()=>{this.buttonClickLogout()};
            LogoutBtn.setAttribute('value','Logout');
            ListItem.appendChild(ParagraphTag);
            ListItemBtn.appendChild(LogoutBtn);
            LoginStatDiv.appendChild(ListItem);
            LoginStatDiv.appendChild(ListItemBtn);

        }
    }

    render() {
        return (
            <Router>
            <div>
                <form>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="collpase navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/" className="nav-link">Home</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/register" className="nav-link">Register</Link>
                            </li>
                            <li className="navbar-item">
                                <div onClick={()=>{this.openUserPortal()}}  className="bg-dark nav-link">My Portal</div>
                            </li>
                            <div id="LoginStat" className="navbar-nav mr-auto" style={{position:'absolute',right:10}}>
                            </div>
                        </ul>
                    </div>
                </nav>
                    <div id="textDiv" />
                </form>


            </div>
                <Route path="/login" exact component={LoginOthersComp} />
                <Route path="/Instructor/" exact component={InstructorHome} />
                <Route path="/Student/" exact component={StudentHome} />
                <Route path="/admin" exact component={LoginAdminComp} />
                <Route path="/register" exact component={StudentRegisterComp} />
                <Route path="/attempt_exam" exact component={StudentAttemptExam} />

                {/*Kaja Administratory Directory File*/}
                <AdminReactRoutes/>
            </Router>
        );
    }
}