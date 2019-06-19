const express = require('express');
const routes = express.Router();

const InstructorRoutes = require('./Elements/Instructor/Instructor.routes');
const ModuleRoutes = require('./Elements/Module/Module.routes');
const AssignmentRoutes = require('./Elements/Assignment/Assignment.routes');
const ExamRoutes = require('./Elements/Exam/Exam.routes');
const MarkRoutes = require('./Elements/Marks/Marks.routes');

routes.use('/instructors',InstructorRoutes);
routes.use('/modules',ModuleRoutes);
routes.use('/assignments',AssignmentRoutes);
routes.use('/exams',ExamRoutes);
routes.use('/marks',MarkRoutes);

module.exports = routes;
