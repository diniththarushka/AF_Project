import React from 'react';

import {BrowserRouter as Router,Route,Link} from "react-router-dom";

import HomePage from "./Page/HomePage";
import ProfilePage from "./Page/AdminSection/ProfilePage";
import ViewAdminPage from "./Page/AdminSection/ViewAdminPage";
import CreateAdminPage from "./Page/AdminSection/CreateAdminPage";

import InstructorPage from "./Page/InstructorSection/InstructorPage";
import CreateInstructorPage from "./Page/InstructorSection/CreateInstructorPage";
import ViewInstuctorPage from "./Page/InstructorSection/ViewInstructorPage"

import CreateModulePage from "./Page/ModuleSection/CreateModulePage";
import ViewModulePage from "./Page/ModuleSection/ViewModulePage";

function AdminReactRoutes(props) {
    return (
        <Router>
            <div>
                {/*Admin Routes*/}
                <Route path="/home/:id" strict component={HomePage}/>
                <Route path="/profile/:id" strict component={ProfilePage}/>
                <Route path="/adminList/:id" strict component={ViewAdminPage}/>
                <Route path="/createAdmin/:id" strict component={CreateAdminPage}/>


                {/*Instructor Routes*/}
                <Route path="/createIns/:id" strict component={CreateInstructorPage }/>
                <Route path="/InsList/:id" strict component={ ViewInstuctorPage }/>
                <Route path="/Ins/:id" strict component={InstructorPage}/>

                {/*Module Routes*/}
                <Route path="/createModule/:id" strict component={CreateModulePage }/>
                <Route path="/ModuleList/:id" strict component={ViewModulePage }/>
            </div>
        </Router>
    );
}

export default AdminReactRoutes;

