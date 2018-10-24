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
    // res.send(questionList[req.params.id]);
    res.sendFile(__dirname + "/public/question.html");
});

app.get('/questiondetail/:id', (req,res) => {
    // let questionList = JSON.parse(fs.readFileSync('./questions.json')) ;
    // console.log('Yo ' + questionList[req.params.id]);

    QuestionModel.findOne({_id: req.params.id}, (err, questionFound) => {
        if(err) console.log(err)
        else{
            res.send(questionFound);
        }
    });
    
});

app.post('/answer', (req,res) => {
    //find...AndUpdate
    //find -> save
    
    // QuestionModel.findById(questionId);
    // QuestionModel.findOne({ "id" : questionId}, (err, questionFound) => {
    //     if(err) console.log(err)
    //     else if(!questionFound) console.log("Not found")
    //     else {
    //         questionFound.yes += 1;
    //         questionfound
    //     }
    // });

    const {questionId, answer} = req.body;
    let yes = Number(req.body.yes);
    let no = Number(req.body.no);
    if(answer == 'yes'){
        QuestionModel.findByIdAndUpdate(questionId, {"yes": yes=yes+1} , (err, questionFound) => {
            if(err) console.log(err)
            else{
                console.log(questionFound);
            }
        });
    }else{
        QuestionModel.findByIdAndUpdate(questionId, {"no": no=no+1} , (err, questionFound) => {
            if(err) console.log(err)
            else{
                console.log(questionFound);
            }
        })
    }
    

    // let questionList = JSON.parse(fs.readFileSync('./questions.json')) ;
    // questionList[questionId][answer] += 1;
    // fs.writeFileSync('./questions.json', JSON.stringify(questionList));
    res.send({success:1});
    
});


app.get('/randomquestion', (req,res)=>{
    // let questionList = JSON.parse(fs.readFileSync('./questions.json')) ;
    // if(questionList.length > 0){
    //     let randomIndex = Math.floor(Math.random() * questionList.length);
    //     let questionRandom = questionList[randomIndex];
    //     res.send(questionRandom);
    // }


    QuestionModel.find({}, (err, questionFound) => {
        var questionMap = [];
        questionFound.forEach(function(question){
            questionMap.push(question);
        });

        let randomIndex = Math.floor(Math.random() * questionMap.length);
        let questionRandom = questionMap[randomIndex];
        res.send(questionRandom);
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