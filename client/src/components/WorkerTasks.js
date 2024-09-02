import React, { useEffect, useState } from "react";
import axios from "axios";

function WorkerTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('/api/worker/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>My Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WorkerTasks;
