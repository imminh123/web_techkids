const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

mongoose.connect("mongodb://localhost/techkids-hotgirl", (err) => {
    if(err) console.log(err)
    else console.log("DB connect success!");
});


const UserRouter = require('./routers/userRouter');
const ImageRouter = require('./routers/imageRouter');
const CommentRouter = require('./routers/commentRouter');


const port = 6161;
app.use(bodyParser.urlencoded({extended : true})); //app.use -> middleware 
app.use(bodyParser.json());

app.use("/api/users", UserRouter);
app.use("/api/images", ImageRouter);
app.use("/api/comments", CommentRouter);

// Middleware
UserRouter.use((req,res, next) => {
    console.log("404");
    res.send("404");
});

app.listen(port, (err)=>{
    if(err) console.log(err)
    else console.log("Listen at port "+ port);
});