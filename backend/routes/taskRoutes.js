const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
router.post("/add", async (req, res) => {
  try {
    const newTask = new Task({
      title: req.body.title,
      description: req.body.description,
    });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.get("/all", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.put("/update/:id", async (req, res) => {
  try {
    const updateTask = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    );
    res.json(updateTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.delete("/delete/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task Deleted Successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
