import axios from "axios";

const API_URL = 'http://localhost:5109/api/tasks';

export const getTasks = async () => { 
    try { 
        const res = await axios.get(API_URL);
        return res.data;
    } catch(error) {
        console.error("Error fetching tasks", error);
        throw error;
    };
}

export const getTasksById = async (id) => { 
    try { 
        const res = await axios.get(`${API_URL}/${id}`);
        return res.data;
    } catch(error) {
        console.error("Error fetching task by id", error);
        throw error;
    };
}

export const createTask = async (taskData) => { 
    try { 
        const res = await axios.post(API_URL, taskData);
        return res.data;
    } catch(error) {
        console.error("Error creating tasks", error);
        throw error;
    };
}

export const updateTask = async (taskData, taskId) => { 
    try {
        const res = await axios.put(`${API_URL}/${taskId}`, taskData);
        return res.data;
    } catch(error) {
        console.error("Error updating tasks", error);
        throw error;
    }
}

export const deleteTask = async (taskId) => { 
    try { 
        const res = await axios.post(`${API_URL}/${taskId}`);
        return res.data;
    } catch(error) {
        console.error("Error deleting tasks", error);
        throw error;
    };
}