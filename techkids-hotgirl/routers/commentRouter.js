const express = require('express');
const CommentRouter = express.Router();

const CommentModel = require('../models/commentModel');

CommentRouter.use('/', (req,res, next) => {
    console.log("Middleware");
    next();
});

CommentRouter.get('/', (req,res)=>{
    CommentModel.find({}, (err, commentFound)=>{
        if(err) console.log(err);
        else res.status(200).json({success: 1, comment: commentFound})
    });
});

CommentRouter.post('/', (req,res) => {
    const {user, content} = req.body;
    CommentModel.create({user, content}, (err, commentCreated) => {
        if(err) res.status(500).json({success : 0, message: err})
        else res.status(201).json({success: 1, iamge: commentCreated})
    });
});


CommentRouter.put('/:id', (req, res) => {
    let commentId = req.params.id;
    const {user, content} = req.body;

    CommentModel.findById(commentId, (err, commentFound) => {
        if(err) res.status(500).json({success : 0, message: err})
        else if(!commentFound) res.status(404).json({success: 0, message: "Not Found"})
        else{
            for(key in {user, content}){
                if(commentFound[key] && req.body[key]) commentFound[key] = req.body[key];
            }
            commentFound.save((err, commentUpdated) => {
                if(err) res.status(500).json({success: 0, message: err})
                else res.status(201).json({success: 1, comment: commentUpdated})
            });
        }
    });
});

CommentRouter.delete('/:id', (req,res) => {
    let commentId = req.params.id;
    CommentModel.deleteOne({_id: commentId}, (err) => {
        if(err) res.status(500).json({success :1, message: err})
        else res.status(200).json({success: 1})
    })
});
module.exports = CommentRouter;