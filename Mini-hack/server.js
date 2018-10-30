const express = require('express');
const bodyParser = require('body-parser');
const moongoose = require('mongoose');
const app = express();
const ScoreModel = require('./models/scoreModel')

moongoose.connect("mongodb://localhost/Mini-hack", (err) => {
    if (err) console.log(err);
    else console.log("DB connect success")
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }
));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/create.html')
});

// app.get('/addround', (req, res) => {
//     res.sendFile(__dirname + '/public/addround.html');
// });

app.post('/createnewgame', (req, res) => {
    console.log(req.body);
    var player = [req.body.player1, req.body.player2, req.body.player3, req.body.player4];
    console.log('Player ne: ' + player);
    ScoreModel.create({
        player: [req.body.player1, req.body.player2, req.body.player3, req.body.player4],
        score: [[0,0,0,0]]
    },
        (err, game) => {
            if (err) console.log(err)
            else res.redirect('/games/' + game._id);
        });
});

app.get('/games/:id', (req, res) => {
    res.sendFile(__dirname + '/public/addround.html');
});

app.post('/games/:id', (req, res) => {
    let id = req.params.id;
    console.log('id ne' + id);
    ScoreModel.findById(id, (err, gameFound) => {
        if (err) console.log(err)
        else if (!gameFound) console.log('Game not found')
        else {
            console.log(gameFound);
            res.send(gameFound);
        }
    });
});
app.post('/process/:id', (req, res) => {
    let id = req.params.id;
    let { stt, value, numberOfRows } = req.body;
    console.log("sdafsadfsdaf");
    ScoreModel.findById(id, (err, gameFound) => {
        if (err) console.log(err)
        else if (!gameFound) console.log('Game not found')
        else {
            console.log('game '+ gameFound);
            console.log('num rows '+ numberOfRows);
            console.log('stt '+ stt);
            gameFound.score[numberOfRows-2][stt-1] = value;
            gameFound.markModified("score");
            gameFound.save((err, updated) => {
                if (err) console.log(err)
                else res.send(gameFound);
            });


        }
    });
});

app.post('/addRound', (req,res) => {
    let id = req.body.id;
    ScoreModel.findById(id, (err, gameFound) => {
        if (err) console.log(err)
        else if (!gameFound) console.log('Game not found')
        else {
            gameFound.score.push([0,0,0,0]);
            gameFound.markModified("score");
            gameFound.save((err, updated) => {
                if (err) console.log(err)
                else res.send(gameFound);
            })

        }
    });
});

app.listen(1125, (err) => {
    if (err) console.log(err)
    else console.log('Server is listening at port 1125')
});
