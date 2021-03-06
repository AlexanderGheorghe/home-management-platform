using HomeManagementCore.Models;
using HomeManagementCore.Authentication;
using HomeManagementCore.services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HomeManagementCore.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TodosController : ControllerBase
    {
        private readonly TodoContext _context;
        private readonly NotificationService _notificationService;
        public TodosController(TodoContext context, NotificationService notificationService)
        {
            _context = context;
            _notificationService = notificationService;
        }
        // GET: api/<TodosController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Todo>>> GetTodos()
        {
            return await _context.Todos.ToListAsync();
        }

        // GET api/<TodosController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Todo>> GetTodo(int id)
        {
            var todo = await _context.Todos.FindAsync(id);
            return todo == null ? NotFound() : todo;
        }

        // POST api/<TodosController>
        [HttpPost]
        public async Task<ActionResult<Todo>> PostTodo(Todo todo)
        {
            var httpContextItem = (HttpContext.Items["User"] as User);
            if (httpContextItem != null)
            {
                var currentUsersEmail = httpContextItem.Email;
                var completed = todo.Completed ? "completed" : "active";
                _notificationService.CreateProductAsync(new NotificationRequest(currentUsersEmail, "Task with name " + todo.Title + " was created"));
            }
            _context.Todos.Add(todo);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTodo), new { id = todo.Id }, todo);
        }

        // PUT api/<TodosController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Todo>> PutTodo(int id, Todo todo)
        {
            if (id != todo.Id) return BadRequest();
            _context.Entry(todo).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
                
                var httpContextItem = (HttpContext.Items["User"] as User);
                if (httpContextItem != null)
                {
                    var currentUsersEmail = httpContextItem.Email;
                    var completed = todo.Completed ? "completed" : "active";
                    _notificationService.CreateProductAsync(new NotificationRequest(currentUsersEmail, "Task name changed to " + todo.Title + " and was marked as " + completed));
                }
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TodoExists(id)) return NotFound();
                else throw;
            }
            return todo;
        }

        // DELETE api/<TodosController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodo(int id)
        {
            var todo = await _context.Todos.FindAsync(id);
            if (todo == null) return NotFound();
            _context.Todos.Remove(todo);
            await _context.SaveChangesAsync();
            
            var httpContextItem = (HttpContext.Items["User"] as User);
            if (httpContextItem != null)
            {
                var currentUsersEmail = httpContextItem.Email;
                var completed = todo.Completed ? "completed" : "active";
                _notificationService.CreateProductAsync(new NotificationRequest(currentUsersEmail, "Task with name " + todo.Title + " was deleted "));
            }
            
            return NoContent();
        }

        private bool TodoExists(int id)
        {
            return _context.Todos.Any(e => e.Id == id);
        }
    }
}
