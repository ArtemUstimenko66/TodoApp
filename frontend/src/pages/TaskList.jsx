import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask, updateTask } from '../services/taskService';
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
        } catch (error) {
            console.error('Error fetching tasks', error);
        }
    };

    const handleDelete = async (taskId) => {
        try {
            await deleteTask(taskId);
            setTasks(tasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error('Error deleting task', error);
        }
    }

    const handleComplete = async (task) => {
        try {
            const updatedTask = {
                Title: task.title,
                Description: task.description,
                isCompleted: !task.isCompleted
            };
            await updateTask(updatedTask, task.id);
            setTasks(tasks.map(t =>
                t.id === task.id ? { ...t, isCompleted: !t.isCompleted } : t
            ));
        } catch (error) {
            console.error('Error updating task', error);
        }
    }

    return (
        <div className='container mt-4'>
            <h2 className='mb-4'>Tasks</h2>
            <button
                className='btn btn-primary mb-3'
                onClick={() => navigate('/create')}>
                Add Task
            </button>

            <div className='card w-100 mx-auto shadow-lg'>
                <div className='card-body'>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Status</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task, index) => (
                                <tr key={task.id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={task.isCompleted}
                                            onChange={() => handleComplete(task)}
                                            className="form-check-input"
                                        />
                                    </td>
                                    <td style={{
                                        textDecoration: task.isCompleted ? 'line-through' : 'none'
                                    }}>
                                        {task.title}
                                    </td>
                                    <td style={{
                                        textDecoration: task.isCompleted ? 'line-through' : 'none'
                                    }}>
                                        {task.description}
                                    </td>
                                    <td>
                                        <button
                                            className='btn btn-secondary btn-sm me-2'
                                            onClick={() => navigate(`/update/${task.id}`)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(task.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TaskList;