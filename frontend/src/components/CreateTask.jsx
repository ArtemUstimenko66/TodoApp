import { useState } from "react";
import { createTask } from "../services/taskService";
import { useNavigate } from "react-router-dom";

function CreateTask() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => { 
        e.preventDefault();
        if(!title.trim()) {
            return;
         }

         const newTask = { 
            Title: title,
            Description: description
         };

         try {
            await createTask(newTask);
            navigate('/tasks');
         } catch(error) {
            console.error('Error creating task', error);
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
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">Create Task</button>
        </form>
    )
}

export default CreateTask;