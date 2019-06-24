import axios from "axios";

export const createModule = (mod,f,m) => {
    return axios
        .post('http://localhost:4000/Instructors/', {
            Name:mod.name,
            EnrollmentKey:mod.EnrollmentKey,
            Year:mod.Year,
            Semester: mod.Semester,
            Faculty:f,
            Assignments:null,
            Instructors:null,
            Participants:null
        })
        .then(res => {
            console.log(res.data);
            console.log('Registered!');
            return res.data;
        })
};