import { useEffect, useState } from "react";
import { getTasksById, updateTask } from "../services/taskService";
import { useNavigate, useParams } from "react-router-dom";

function UpdateTask() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchTask();
    }, [id, navigate]);

    const fetchTask = async () => { 
        try {
            const task = await getTasksById(id);
            setTitle(task.title);
            setDescription(task.description);
        } catch(error) {
            console.error('Error fetching task', error);
            navigate('/tasks');
        }
    };

    const handleSubmit = async (e) => { 
        e.preventDefault();
        if(!title.trim()) return;

        const updatedTask = { 
            Title: title,
            Description: description
        };

        try { 
            await updateTask(updatedTask, id);
            navigate('/tasks');
        } catch(error) {
            console.error('Error updating task', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
            <button type="sumbit">Update Task</button>
        </form>
    )
}

export default UpdateTask;