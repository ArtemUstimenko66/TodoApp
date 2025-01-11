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

        public CustomTask CreateTask(CreateTaskDto taskDto)
        {
            if(string.IsNullOrWhiteSpace(taskDto.Title))
            {
                throw new ArgumentException("Title is required");

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
            var task = _tasks.FirstOrDefault(t => t.Id == id) ?? throw new KeyNotFoundException("Task not found");

            if (string.IsNullOrWhiteSpace(taskDto.Title))
            {
                throw new ArgumentException("Title is required");
            }

            task.Title = taskDto.Title;
            task.Description = taskDto.Description;
            task.isCompleted = taskDto.isCompleted;

            return task;
        }

        public bool DeleteTask(int id)
        {
            var task = _tasks.FirstOrDefault(t => t.Id == id);
            return task == null ? throw new KeyNotFoundException("Task not found") : _tasks.Remove(task);
        }
    }
}
