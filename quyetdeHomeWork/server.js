const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low)
  }

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req,res) => {
    let questionList = JSON.parse(fs.readFileSync('./questions.json'));
    let random = randomInt(0,questionList.length);
    res.render('answer', {questionContent: questionList[random].questionContent});
});


app.get('/ask', (req,res) => {
    res.render('ask');
});

app.get('/answer', (req,res) => {
    res.render('answer');
});

app.post('/ask', (req,res) => {
    // req.body
    // req.on('data' , (data) => {
    //     console.log(data);
    // }) event xay ra khi co data gui len
    console.log(req.body);
    let questionList = JSON.parse(fs.readFileSync('./questions.json'));
    
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