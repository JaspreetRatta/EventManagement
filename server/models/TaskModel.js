const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    taskName: { type: String, required: true },
    taskDescription: String,
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'worker' },
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
    deadline: Date
});

module.exports = mongoose.model('Task', TaskSchema);
