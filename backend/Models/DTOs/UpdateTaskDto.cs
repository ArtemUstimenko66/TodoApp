namespace backend.Models.DTOs
{
    public class UpdateTaskDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public bool isCompleted { get; set; }
    }
}
