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
    }, [id]);

    const fetchTask = async () => {
        try {
            const task = await getTasksById(id);
            setTitle(task.title);
            setDescription(task.description);
        } catch (error) {
            console.error('Error fetching task', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        const updatedTask = {
            Title: title,
            Description: description
        };

        try {
            await updateTask(updatedTask, id);
            navigate('/');
        } catch (error) {
            console.error('Error updating task', error);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Update Task</h2>
            <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <textarea
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="d-flex justify-content-between">
                    <button type="sumbit" className="btn btn-primary">Update Task</button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate('/')}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>

    )
}

export default UpdateTask;