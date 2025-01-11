import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask } from '../services/taskService';
import { useNavigate } from 'react-router-dom';
function TaskList() {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => { 
        fetchTasks();
    }, []);

    const fetchTasks = async () => { 
        try { 
            const tasks = await getTasks();
            setTasks(tasks);
        } catch(error) {
            console.error('Error fetching tasks', error);
        }
    };

    return (
        <div>
            <h2>Tasks</h2>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <div>
                            <strong>{task.title}</strong>
                            <p>{task.description}</p>
                            <button onClick={() => navigate(`/update/${task.id}`)}>
                                Edit
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <button onClick={() => navigate('/create')}>Add Task</button>
        </div>
    );
};

export default TaskList;