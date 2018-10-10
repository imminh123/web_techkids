const express = require('express');
const path = require('path');
const app = express();
const request = require('request');
const axios = require('axios');


app.get('/', (req,res) => {
    res.sendfile(path.resolve(__dirname, './index.html'));
})

app.get('/ola/:classroom/param2', (req,res) => {
    
    res.send('Ola ' + classroomName);
})


app.get('/:classroom', (req,res) => {
    const classroomName = req.params.classroom; //co the lay nhieu param /:classroom/:next/:nextnext
    console.log(classroomName);
    console.log(req.query);
    axios.get('https://btvn-web15s.herokuapp.com/api/'+ classroomName)
    .then(function(data){
        console.log(data);
        res.send(data);
    })
    // axios({
    //     url : 'https://btvn-web15s.herokuapp.com/api/web15',
    //     method: 'GET'
    // }).then(function(data){
    //     console.log(data);
    //     res.send(data);
    // })
})




app.get('/web14', (req,res) => {
    let url = 'https://btvn-web15s.herokuapp.com/api/web14';
    request(url, function(err, response , body){
        if(err){
            console.log(err);
        }else{
            let data = JSON.parse(body);
            res.send(data.students);
            // console.log(`The temperature in ${bodyContent.name} is ${bodyContent.main.temp} degrees`);
        }

    });
})
app.get('/web13', (req,res) => {
    let url = 'https://btvn-web15s.herokuapp.com/api/web13';
    request(url, function(err, response , body){
        if(err){
            console.log(err);
        }else{
            let data = JSON.parse(body);
            res.send(data.students);
            // console.log(`The temperature in ${bodyContent.name} is ${bodyContent.main.temp} degrees`);
        }

    });
})
app.get('/web12', (req,res) => {
    let url = 'https://btvn-web15s.herokuapp.com/api/web12';
    request(url, function(err, response , body){
        if(err){
            console.log(err);
        }else{
            let data = JSON.parse(body);
            res.send(data.students);
            // console.log(`The temperature in ${bodyContent.name} is ${bodyContent.main.temp} degrees`);
        }

    });
})
app.get('/web11', (req,res) => {
    let url = 'https://btvn-web15s.herokuapp.com/api/web11';
    request(url, function(err, response , body){
        if(err){
            console.log(err);
        }else{
            let data = JSON.parse(body);
            res.send(data.students);
            // console.log(`The temperature in ${bodyContent.name} is ${bodyContent.main.temp} degrees`);
        }

    });
})
app.get('/web10', (req,res) => {
    let url = 'https://btvn-web15s.herokuapp.com/api/web10';
    request(url, function(err, response , body){
        if(err){
            console.log(err);
        }else{
            let data = JSON.parse(body);
            res.send(data.students);
            // console.log(`The temperature in ${bodyContent.name} is ${bodyContent.main.temp} degrees`);
        }

    });
})
app.listen(3500, (err) =>{
    if(err){
        console.log(err);
    }else{
        console.log('Server is listening at port 3000');
    }
})