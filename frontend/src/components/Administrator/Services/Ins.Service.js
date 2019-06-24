import axios from 'axios'


export const registerIns = (ins,f,m) => {
    return axios
        .post('http://localhost:4000/Instructors/', {
            Name: ins.Name,
            Email: ins.Email,
            Password: ins.Password,
            Faculty:f.Faculty,
            Modules:m.Modules
        })
        .then(res => {
            console.log(res.data);
            console.log('Registered!');
            return res.data;
        })
};

export const sendEmailToIns= (sender,reciever) => {
    return axios
        .post('http://localhost:4000/Emails/sendIns', {
            sender:sender,
            reciever:reciever
        })
        .then(res => {
            console.log(res.data);
            console.log('Email sent!');
            return res.data;
        })
};


export const getIns= (id)=>{
    return axios
        .get('http://localhost:4000/instructors/'.concat(id))
        .then(res => {
            console.log(res.data);
            return res.data;
        })
        .catch(err => {
            console.log(err)
        })
};

// retrieve InsList
export const getInsList= ()=>{
    return axios
        .get('http://localhost:4000/instructors')
        .then(res => {
            console.log(res.data);
            return res.data;
        })
        .catch(err => {
            console.log(err)
        })
};