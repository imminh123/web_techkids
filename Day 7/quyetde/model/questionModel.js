const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    questionContent: {type: String, required: true},
    yes: {type: Number, default: 0},
    no: {type: Number, default: 0}
});

const QuestionModel = mongoose.model("Question", QuestionSchema);

QuestionModel.find({}, (err, questions) => {
    if(err) console.log(err)
    else console.log('"Questions', questions);
});

module.exports = QuestionModel; //export ra de server co the require
