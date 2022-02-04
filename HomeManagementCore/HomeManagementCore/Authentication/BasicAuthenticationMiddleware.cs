using HomeManagementCore.Models;
using Microsoft.EntityFrameworkCore;
using System.Net.Http.Headers;
using System.Text;

namespace HomeManagementCore.Authentication
{
    public class BasicAuthenticationMiddleware
    {
        private readonly RequestDelegate _next;

        public BasicAuthenticationMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context, TodoContext todoContext)
        {
            try
            {
                var authHeader = AuthenticationHeaderValue.Parse(context.Request.Headers["Authorization"]);
                var credentialBytes = Convert.FromBase64String(authHeader.Parameter);
                var credentials = Encoding.UTF8.GetString(credentialBytes).Split(':', 2);
                var username = credentials[0];
                var password = credentials[1];

                var user = await todoContext.Users.SingleOrDefaultAsync(x => x.Username == username && x.Password == password);
                if (user != null && user.ConfirmedEmail)
                    context.Items["User"] = user;
                else
                    context.Items["User"] = null;
            }
            catch {}

            await _next(context);
        }
    }
}
