const express = require('express');
const router = express.Router();
const Task = require('../models/TaskModel');
const Worker = require('../models/wokersModel');

// Create a new task
router.post('/', async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find().populate('assignedTo');
        res.json(tasks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// get-worker-by-id
router.post("/get-worker-by-id", async (req, res) => {
    try {
      const worker = await Worker.findById(req.body._id);
      return res.status(200).send({
        success: true,
        message: "Worker fetched successfully",
        data: worker,
      });
    } catch (error) {
      res.status(500).send({ success: false, message: error.message });
    }
  });

module.exports = router;
