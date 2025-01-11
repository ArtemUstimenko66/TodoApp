using backend.Models;
using backend.Models.DTOs;

namespace backend.Services
{
    public interface ITaskService
    {
        IEnumerable<CustomTask> GetAllTasks();
        CustomTask CreateTask(CreateTaskDto taskDto);
        CustomTask UpdateTask(int id, UpdateTaskDto taskDto);
        bool DeleteTask(int id);
    }
}
