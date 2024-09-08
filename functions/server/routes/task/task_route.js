const express = require('express');
const userTaskRoute = express.Router();
const { task_model } = require('../../model/tasks/task_model');

// Route to create a new task
userTaskRoute.post("/create", async (req, res) => {
    const date = new Date();
    const timeDate = date.toLocaleString('en-IN');
    const { Title, Description, Priority } = req.body;
    
    if (!Title || !Description || !Priority) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const newTask = new task_model({
            Title,
            CreatedAt: timeDate,
            Description,
            Priority,
        });
        const result = await newTask.save();
        return res.status(201).json({ message: 'Task Created successfully', data: result });

    } catch (error) {
        return res.status(500).json({ message: 'Create Task failed', error: error.message });
    }
});


// Route to get all tasks
userTaskRoute.get("/", async (req, res) => {
    try {
        const getAllTasks = await task_model.find();
        return res.status(201).json({ message: "Fetching all Tasks Successfully", tasks: getAllTasks });
    } catch (e) {
        return res.status(500).json({ message: "Fetching Tasks Failed", error: e.message });
    }
});


// Route to delete a task (uncommented)
userTaskRoute.delete("/:taskId", async (req, res) => {
    const { taskId } = req.params;
    try {
        const deleteResult = await task_model.deleteOne({ _id: taskId });
        if (deleteResult.deletedCount === 0) {
            return res.status(404).json({ message: "Task not found" });
        }
        return res.status(201).json({ message: "Task Deleted Successfully" });

    } catch (e) {
        return res.status(500).json({ message: "Deleting Task Failed", error: e.message });
    }
});


// Route to update a task
userTaskRoute.post("/update", async (req, res) => {
    const { id, ...updateData } = req.body;

    if (!id) {
        return res.status(400).json({ message: "Task ID is required" });
    }

    try {
        const updateTask = await task_model.updateOne({ _id: id }, updateData, { upsert: false });
        if (updateTask.matchedCount === 0) {
            return res.status(404).json({ message: "Task not found" });
        }
        return res.status(201).json({ message: "Task Updated Successfully", data: updateTask });

    } catch (e) {
        return res.status(500).json({ message: "Update Task Failed", error: e.message });
    }
});

module.exports = { userTaskRoute };
