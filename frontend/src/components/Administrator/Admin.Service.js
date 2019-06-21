import axios from 'axios'

export const registerAdmin = newUser => {
    return axios
        .post('http://localhost:4000/Administrators/register', {
            name:newUser.name,
            contactNo: newUser.contactNo,
            address:newUser.address,
            email: newUser.email,
            password: newUser.password
        })
        .then(res => {
            console.log(res.data);
            console.log('Registered!');
            return res.data;
        })
};

export const sendEmailToAdmin= obj => {
    return axios
        .post('http://localhost:4000/Administrators/register', {
            senderEmail:obj.senderEmail,
            recieverEmail:obj.recieverEmail,
            recieverPassword: obj.password
        })
        .then(res => {
            console.log(res.data);
            console.log('Registered!');
            return res.data;
        })
};


export const login = user => {
    return axios
        .post('http://localhost:4000/Administrators/login', {
            email: user.email,
            password: user.password
        })
        .then(res => {
            return res.data;

        })
        .catch(err => {
            console.log(err);
            return false;
        })
};
export const getProfile = id => {
     return axios
        .get('http://localhost:4000/Administrators/profile/'.concat(id), {
            headers: { Authorization: ` ${id}` }
        })
        .then(res => {
            console.log(res);
            console.log(res.data);
            return res.data;
        })
        .catch(err => {
            console.log(err)
        })
};

// retrieve adminList
export const getAdminList= ()=>{
    return axios
        .get('http://localhost:4000/Administrators/adminList')
        .then(res => {
            console.log(res.data);
            console.log(res.data);
            return res.data;
        })
        .catch(err => {
            console.log(err)
        })
};