﻿using backend.Models.DTOs;
using backend.Services;
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
                return BadRequest(ex.Message);
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
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
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
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTask(int id)
        {
            try
            {
                var result = _taskService.DeleteTask(id);
                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}