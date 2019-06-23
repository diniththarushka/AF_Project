const Express = require('express');
const router = Express.Router();
const StudentQuestion = require('./StudentQuestion.model');

router.post('/add',(req,res)=>{

    const questions = new StudentQuestion({
        itNumber:req.body.itNumber,
        module:req.body.module,
        question:req.body.question,
        email:req.body.email
    });

    questions.save().then(resolve=>{
        res.status(200).send({message:"Added successfully",data:resolve})

    }).catch(err=>{
        res.status(500).send({message:err})
    })
})

router.get('/allquestions',(req,res)=>{
    StudentQuestion.find().then(questions=>{
        res.status(200).send({data:questions});
    }).catch(err=>{
        res.status(500).send({message:err});
    })
});
module.exports=router;






