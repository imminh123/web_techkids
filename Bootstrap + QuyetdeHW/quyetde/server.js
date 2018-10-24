const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');
const QuestionModel = require('./model/questionModel')




mongoose.connect("mongodb://localhost/quyetde", (err) => {
    if(err) console.log(err)
    else console.log("DB connect success!");
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'));

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/public/answer.html');
});

app.get('/ask', (req,res) => {
    res.sendFile(__dirname + '/public/ask.html');
});

app.get('/answer', (req,res) => {
    res.sendFile(__dirname + '/public/answer.html');
});

app.get('/question', (req,res) => {
    console.log('Load question.html');
    res.sendFile(__dirname + '/public/question.html');
});

app.get('/question/:id', (req,res) => {
    // let questionList = JSON.parse(fs.readFileSync('./questions.json')) ;
    // res.send(req.params.id);
    res.sendFile(__dirname + "/public/question.html");
});

app.get('/questiondetail/:id', (req,res) => {
    // let questionList = JSON.parse(fs.readFileSync('./questions.json')) ;
    // console.log('Yo ' + questionList[req.params.id]);

    let questionId = req.params.id;
    QuestionModel.findById(questionId, (err, questionFound) => {
        if(err) console.log(err)
        else if(!questionFound) console.log("Not found")
        else{
            console.log("Sucess");
            res.send(questionFound);
        }
    })

    
});

app.post('/answer', (req,res) => {
    const {questionId, answer} = req.body;
    
    let yes = Number(req.body.yes);
    let no = Number(req.body.no);
    
    //----------Cach 1--------

    // QuestionModel.findByIdAndUpdate(questionId, { $inc: answer =="yes" ? {"yes": 1} : {"no":1}} , (err, questionFound) => {
    //     if(err) console.log(err)
    //     else{
    //         console.log(questionFound);
    //     }
    // });

    //----------Cach 2--------
    QuestionModel.findById(questionId, (err, questionFound) => {
        if(err) console.log(err);
        else if(!questionFound) console.log("Not found")
        else{
            //edit here
            questionFound[answer] += 1;
            questionFound.save((err) => {
                if(err) console.log(err)
                else res.send({success: 1});
            })
        }
    });
    
});


app.get('/randomquestion', (req,res)=>{
    // let questionList = JSON.parse(fs.readFileSync('./questions.json')) ;
    // if(questionList.length > 0){
    //     let randomIndex = Math.floor(Math.random() * questionList.length);
    //     let questionRandom = questionList[randomIndex];
    //     res.send(questionRandom);
    // }
    QuestionModel.count({}, (err, count) => {
        let randomIndex = Math.floor(Math.random() * count);
        QuestionModel.findOne({}, null ,{skip: randomIndex}, (err, questionFound) => {
            if(err) console.log(err)
            else res.send(questionFound);
        });
    });
    
    
})

app.post('/ask', (req,res) => {
    // req.body
    // req.on('data' , (data) => {
    //     console.log(data);
    // }) event xay ra khi co data gui len
    // let questionList = JSON.parse(fs.readFileSync('./questions.json')) ;
    
    // const newQuestion = {
    //     id:questionList.length,
    //     questionContent: req.body.txtArea,
    //     yes:0,
    //     no:0
    // }

    //---------use mongoDB---------------

    //cach 1
    // const newQuestion = new QuestionModel({
    //     questionContent: req.body.txtArea
    // });
    // newQuestion.save();
    // res.redirect('/answer');

    //cach 2
    QuestionModel.create(
       {questionContent: req.body.txtArea},
       (err, questionCreated) => {
           if(err) console.log(err)
           else res.redirect('/question/'+ questionCreated._id);
       }
    );
    
    
    // questionList.push(newQuestion);

    // fs.writeFileSync('./questions.json', JSON.stringify(questionList));
    
});



app.listen(3600, (err) => {
    if(err) console.log(err)
    else console.log("Server is listening at port 3600")
})