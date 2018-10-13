const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

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
    let questionList = JSON.parse(fs.readFileSync('./questions.json')) ;
    res.send(questionList[req.params.id]);
})

app.post('/answer', (req,res) => {
    const {questionId, answer} = req.body;
    //equal
    // const questionid = req.body.questionid;
    // const answer = req.body.answer;
    let questionList = JSON.parse(fs.readFileSync('./questions.json')) ;
    questionList[questionId][answer] += 1;
    fs.writeFileSync('./questions.json', JSON.stringify(questionList));
    res.send({success:1});
    
})
app.get('/randomquestion', (req,res)=>{
    let questionList = JSON.parse(fs.readFileSync('./questions.json')) ;
    if(questionList.length > 0){
        let randomIndex = Math.floor(Math.random() * questionList.length);
        let questionRandom = questionList[randomIndex];
        res.send(questionRandom);
    }
})

app.post('/ask', (req,res) => {
    // req.body
    // req.on('data' , (data) => {
    //     console.log(data);
    // }) event xay ra khi co data gui len
    let questionList = JSON.parse(fs.readFileSync('./questions.json')) ;
    
    const newQuestion = {
        id:questionList.length,
        questionContent: req.body.txtArea,
        yes:0,
        no:0
    }

    questionList.push(newQuestion);

    fs.writeFileSync('./questions.json', JSON.stringify(questionList));
    res.redirect('/answer');
});



app.listen(3600, (err) => {
    if(err) console.log(err)
    else console.log("Server is listening at port 3600")
})