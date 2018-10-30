const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Model = mongoose.model;

const ScoreSchema = new Schema({
    player: {type: Array},
    score:  [[Number]]
});

const ScoreModel = mongoose.model("Score", ScoreSchema);

// QuestionModel.find({}, (err, questions) => {
//     if(err) console.log(err)
//     else console.log("questions", questions);
// });

module.exports = ScoreModel;