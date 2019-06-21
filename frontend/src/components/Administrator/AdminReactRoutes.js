import React from 'react';

import {BrowserRouter as Router,Route,Link} from "react-router-dom";

import HomePage from "./Page/HomePage";
import ProfilePage from "./Page/AdminSection/ProfilePage";
import ViewAdminPage from "./Page/AdminSection/ViewAdminPage";
import CreateAdminPage from "./Page/AdminSection/CreateAdminPage";



import CreateInstructorPage from "./Page/InstructorSection/CreateInstructorPage";
import ViewInstuctorPage from "./Page/InstructorSection/ViewInstructorPage"



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
            </div>
        </Router>
    );
}

export default AdminReactRoutes;

