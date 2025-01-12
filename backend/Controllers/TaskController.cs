using backend.Interfaces;
using backend.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using CustomTask = backend.Models.CustomTask;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TasksController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<CustomTask>> GetTasks()
        {
            try
            {
                var tasks = _taskService.GetAllTasks();
                return Ok(tasks);
            }
            catch(Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public ActionResult<CustomTask> GetTask(int id)
        {
            try
            {
                var task = _taskService.GetTaskById(id);
                return Ok(task);
            } 
            catch(KeyNotFoundException ex) 
            {
                return NotFound(ex.Message);
            }
            catch(Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost]
        public ActionResult<CustomTask> CreateTask(CreateTaskDto taskDto)
        {
            try
            {
                var task = _taskService.CreateTask(taskDto);
                return Ok(task);
            } 
            catch(ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch(Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpPut("{id}")]
        public ActionResult<CustomTask> UpdateTask(int id, UpdateTaskDto taskDto)
        {
            try
            {
                var updatedTask = _taskService.UpdateTask(id, taskDto);
                return Ok(updatedTask);
            } 
            catch(KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch(ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch(Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTask(int id)
        {
            try
            {
                _taskService.DeleteTask(id);
                return NoContent();
            }
            catch(KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch(Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
