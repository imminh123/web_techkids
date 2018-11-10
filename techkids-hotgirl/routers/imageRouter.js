const express = require('express');
const ImageRouter = express.Router();

const ImageModel = require('../models/imageModel');

//Middleware
ImageRouter.use((req,res, next) => {
    console.log("User middleware");
    next();
}); 

ImageRouter.get('/', (req,res) => {
    ImageModel.find({})
        .populate("user", "name avatar")
        .populate("comments")
        .exec((err, image) => {
            if(err) res.status(500).json({success: 0, error: err})
            else res.status(201).json({success: 1, image: image})
        });
});

ImageRouter.post('/', (req,res) => {
    const {user, url, caption, title} = req.body;
    ImageModel.create({user, url, caption, title}, (err, imageCreated) => {
        if(err) res.status(500).json({success : 0, message: err})
        else res.status(201).json({success: 1, iamge: imageCreated})
    });
});


ImageRouter.put('/:id', (req, res) => {
    let imageId = req.params.id;
    const {user, view , like, url, caption, title, comments} = req.body;

    ImageModel.findById(imageId, (err, imageFound) => {
        if(err) res.status(500).json({success : 0, message: err})
        else if(!imageFound) res.status(404).json({success: 0, message: "Not Found"})
        else{
            for(key in {user, view , like, url, caption, title, comments}){
                if(imageFound[key] && req.body[key]) imageFound[key] = req.body[key];
            }
            imageFound.save((err, imageUpdated) => {
                if(err) res.status(500).json({success: 0, message: err})
                else res.status(201).json({success: 1, image: imageUpdated})
            });
        }
    });
});

ImageRouter.delete('/:id', (req,res) => {
    let imageId = req.params.id;
    ImageModel.deleteOne({_id: imageId}, (err) => {
        if(err) res.status(500).json({success :1, message: err})
        else res.status(200).json({success: 1})
    })
});
module.exports = ImageRouter;