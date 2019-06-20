const express = require('express');
const routes = express.Router();

const InstructorRoutes = require('./Elements/Instructor/Instructor.routes');
const ModuleRoutes = require('./Elements/Module/Module.routes');
const AssignmentRoutes = require('./Elements/Assignment/Assignment.routes');
const ExamRoutes = require('./Elements/Exam/Exam.routes');
const StudentRoutes = require('./Elements/Student/Student.routes');

routes.use('/Instructors',InstructorRoutes);
routes.use('/Modules',ModuleRoutes);
routes.use('/Assignments',AssignmentRoutes);
routes.use('/Exams',ExamRoutes);
routes.use('/Students',StudentRoutes);

module.exports = routes;
