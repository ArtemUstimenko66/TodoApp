using backend.Services;
using backend.Models;
using backend.Models.DTOs;

namespace backend.Tests
{
    public class TaskServiceBasicTests
    {
        private readonly ITaskService _taskService;

        public TaskServiceBasicTests()
        {
            _taskService = new TaskService();
        }

        [Fact]
        public void CreateAndGetTask_WorksCurrently()
        {
            var taskDto = new CreateTaskDto
            {
                Title = "Test Task",
                Description = "Test Description"
            };

            var createdTask = _taskService.CreateTask(taskDto);
            var tasks = _taskService.GetAllTasks();

            Assert.Single(tasks);
            var task = tasks.First();
            Assert.Equal("Test Task", task.Title);
            Assert.Equal("Test Description", task.Description);
            Assert.False(task.isCompleted);
        }

        [Fact]
        public void UpdateTask_WorksCurrenly()
        {
            var createDto = new CreateTaskDto
            {
                Title = "Initial Task",
                Description = "Initial Description"
            };
            var task = _taskService.CreateTask(createDto);

            var updateDto = new UpdateTaskDto
            {
                Title = "Updated Task",
                Description = "Updated Description",
                isCompleted = true
            };
            var updatedTask = _taskService.UpdateTask(task.Id, updateDto);

            Assert.Equal("Updated Task", updatedTask.Title);
            Assert.Equal("Updated Description", updatedTask.Description);
            Assert.True(updatedTask.isCompleted);
        }

        [Fact]
        public void DeleteTask_WorksCurrently()
        {
            var taskDto = new CreateTaskDto
            {
                Title = "Test Task",
                Description = "Test Description"
            };
            var task = _taskService.CreateTask(taskDto);

            var result = _taskService.DeleteTask(task.Id);
            var tasks = _taskService.GetAllTasks();

            Assert.True(result);
            Assert.Empty(tasks);
        }

        [Fact]
        public void CreateTask_ThrowsException_WhenTitleIsEmpty()
        {
            var taskDto = new CreateTaskDto
            {
                Title = "",
                Description = "Description"
            };
            Assert.Throws<ArgumentException>(() => _taskService.CreateTask(taskDto));
        }

        [Fact]
        public void UpdateTask_ThrowsException_WhenTaskNotFound()
        {
            var updateDto = new UpdateTaskDto
            {
                Title = "Updated Task",
                Description = "Description"
            };
            Assert.Throws<KeyNotFoundException>(() => _taskService.UpdateTask(999, updateDto));
        }
    }
}