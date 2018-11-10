const express = require('express');
const UserRouter = express.Router();

const userModel = require('../models/userModel');

//Middleware
UserRouter.use((req, res, next) => {
    console.log("User middleware");
    next();
});

//"api/users" ==> get all
UserRouter.get("/", async (req, res) => {
    console.log("Get all user");
    try {
        const users = await userModel.find({}, "name email intro posts").populate("posts");
        res.json({ success: 1, users: users });
    } catch (error) {
        res.status(500).json({ success: 0, error: err });
    }
    // userModel.find({},"name email intro posts")
    //     .populate("posts")
    //     .then(users => res.json({success: 1, users: users}))
    //     .catch(err => res.status(500).json({success: 0, error: err}))
    // .exec((err, users) => {
    //     if(err) )
    //     else )
    // });
});

//getby user id
UserRouter.get("/:id", (req, res) => {
    let userId = req.params.id;
    userModel.findById({ userId }, (err, userFound) => {
        if (err) res.status(500).json({ success: 0, error: err })
        else if (!userFound._id) res.status(404).json({ success: 0, message: "Not found" })
        else res.json({ success: 1 })
    })
});

//create user
UserRouter.post("/", (req, res) => {
    const { name, email, password, avatar, intro } = req.body;
    userModel.create({ name, email, password, avatar, intro }, (err, userCreated) => {
        if (err) res.status(500).json({ success: 1, message: err })
        else res.status(201).json({ success: 1, user: userCreated })
    })
});

//update by id
UserRouter.put("/:id", async (req, res) => { //put async before (req,res) if use async/await
    let userId = req.params.id;
    const { name, password, intro, posts } = req.body;

    // userModel.findById(userId, (err, userFound) => {
    //     if(err) res.status(500).json({success: 0, error: err})
    //     else if(!userFound) res.status(404).json({success: 0, message: "Not found"}) 
    //     else{
    //         for(key in {name, password, intro, posts}){
    //             if(userFound[key] && req.body[key]) userFound[key] = req.body[key]; 
    //         }
    //         // userFound.name = name || userFound.name;
    //         // userFound.password = password || userFound.password;
    //         // userFound.intro = intro || userFound.intro;
    //         userFound.save((err, userUpdated) => {
    //             if(err) console.log(err)
    //             else res.status(201).json({success: 1, user: userUpdated})
    //         });
    //     }
    // });

    // userModel.findById(userId)
    //     .then(userFound => {
    //         if(!userFound){
    //             res.status(404).json({success: 0, message: "Not found"}); 
    //         }else{
    //             for(key in {name, password, intro, posts}){
    //                 if(userFound[key] && req.body[key]){
    //                     userFound[key] = req.body[key];
    //                 }  
    //             };
    //         }

    //         return userFound.save()
    //     })
    //     .then(userUpdated => {
    //         res.status(201).json({success : 1, user: userUpdated});
    //     })
    //     .catch(error => {
    //         res.status(500).json({success: 0, error: error});
    //     })

    try {
        let userFound = await userModel.findById(userId);
        if (!userFound) {
            res.status(404).json({ success: 0, message: "Not found" });
        } else {
            for (key in { name, password, intro, posts }) {
                if (userFound[key] && req.body[key]) {
                    userFound[key] = req.body[key];
                }
            };
            let userUpdated = await userFound.save();
            res.status(201).json({ success: 1, user: userUpdated });
        };


    } catch (error) {
        res.status(500).json({ success: 0, error: error });
    }

});

UserRouter.delete("/:id", (req, res) => {
    let userId = req.params.id;
    userModel.deleteOne({ _id: userId }, (err) => {
        if (err) res.status(500).json({ success: 0, message: err })
        else res.status(201).json({ success: 1 })
    });
});

module.exports = UserRouter;