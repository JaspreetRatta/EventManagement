import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskManagement = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ taskName: '', taskDescription: '' });

    useEffect(() => {
        const fetchTasks = async () => {
            const res = await axios.get('/api/tasks');
            setTasks(res.data);
        };
        fetchTasks();
    }, []);

    const handleChange = (e) => {
        setNewTask({ ...newTask, [e.target.name]: e.target.value });
    };

    const handleStatusChange = (e, taskId) => {
        const updatedTasks = tasks.map(task => 
            task._id === taskId ? { ...task, status: e.target.value } : task
        );
        setTasks(updatedTasks);
    };



    const addTask = async () => {
        const res = await axios.post('/api/tasks', newTask);
        setTasks([...tasks, res.data]);
        setNewTask({ taskName: '', taskDescription: '' });
    };


    const updateTaskStatus = async (taskId, status) => {
        await axios.post(`/api/tasks/tasks/:id/${taskId}`, { status });
        // Optionally, refetch tasks or update the local state to reflect changes
    };

    return (
        <div>
            <h2>Task Management</h2>
            <input name="taskName" value={newTask.taskName} onChange={handleChange} placeholder="Task Name" />
            <input name="taskDescription" value={newTask.taskDescription} onChange={handleChange} placeholder="Task Description" />

            <button onClick={addTask}>Create Task</button>
            <ul>
                {tasks.map(task => (
                    <li key={task._id}>{task.taskName} - {task.status}</li>

            
                ))}
            </ul>

            <ul>
                {tasks.map(task => (
                    <li key={task._id}>
                        <span>{task.taskName} - </span>
                        <select 
                            value={task.status} 
                            onChange={(e) => handleStatusChange(e, task._id)}
                        >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                        <button onClick={() => updateTaskStatus(task._id, task.status)}>Update</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskManagement;
