﻿using backend.Models;
using backend.Models.DTOs;

namespace backend.Interfaces
{
    public interface ITaskService
    {
        IEnumerable<CustomTask> GetAllTasks();
        CustomTask GetTaskById(int id);
        CustomTask CreateTask(CreateTaskDto taskDto);
        CustomTask UpdateTask(int id, UpdateTaskDto taskDto);
        bool DeleteTask(int id);
    }
}
