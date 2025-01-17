﻿using backend.Interfaces;
using backend.Models;
using backend.Models.DTOs;
namespace backend.Services
{
    public class TaskService : ITaskService
    {
        private readonly List<CustomTask> _tasks;
        private int _nextId = 1;

        public TaskService()
        {
            _tasks = new List<CustomTask>();
        }

        public IEnumerable<CustomTask> GetAllTasks()
        {
            return _tasks;
        }

        public CustomTask GetTaskById(int id)
        {
            var task = _tasks.FirstOrDefault(t => t.Id == id)
                ?? throw new KeyNotFoundException("Task not found");
            return task;
        }

        public CustomTask CreateTask(CreateTaskDto taskDto)
        {
            if (string.IsNullOrWhiteSpace(taskDto.Title) || string.IsNullOrWhiteSpace(taskDto.Description))
            {
                throw new ArgumentException("Both Title and Description are required");
            }

            var task = new CustomTask
            {
                Id = _nextId++,
                Title = taskDto.Title,
                Description = taskDto.Description,
                isCompleted = false,
            };

            _tasks.Add(task);
            return task;
        }

         public CustomTask UpdateTask(int id, UpdateTaskDto taskDto)
         {
            var task = _tasks.FirstOrDefault(t => t.Id == id) 
                ?? throw new KeyNotFoundException("Task not found");

            if (string.IsNullOrWhiteSpace(taskDto.Title) || string.IsNullOrWhiteSpace(taskDto.Description))
            {
                throw new ArgumentException("Both Title and Description are required");
            }

            task.Title = taskDto.Title;
            task.Description = taskDto.Description;
            task.isCompleted = taskDto.isCompleted;

            return task;
        }

        public bool DeleteTask(int id)
        {
            var task = _tasks.FirstOrDefault(t => t.Id == id)
                ?? throw new KeyNotFoundException("Task not found");
            return _tasks.Remove(task);
        }
    }
}
