import { useState } from "react";
import { createTask } from "../services/taskService";
import { useNavigate } from "react-router-dom";

function CreateTask() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) {
            return;
        }

        const newTask = {
            Title: title,
            Description: description
        };

        try {
            await createTask(newTask);
            navigate('/');
        } catch (error) {
            console.error('Error creating task', error);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Create Task</h2>
            <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        placeholder="Description"
                        id="description"
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="d-flex justify-content-between">
                    <button
                        type="submit" className="btn btn-primary">Create Task</button>
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

export default CreateTask;