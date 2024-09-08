const mongoose = require('mongoose');
const date = new Date();

const task_schema = new mongoose.Schema(
    {
    Title: { type: String, required: true, },
    Description: { type: String, required: true, },
    CreatedAt: { type: Date, },
    Priority: { type: String, required: true },
    Status:{type:String,default:"todo"}
    },
    {
        versionKey: false
    });

const task_model = mongoose.model('tasks', task_schema)

module.exports = { task_model };