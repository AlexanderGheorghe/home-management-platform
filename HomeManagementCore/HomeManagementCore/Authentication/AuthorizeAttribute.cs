﻿using HomeManagementCore.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace HomeManagementCore.Authentication
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class AuthorizeAttribute : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            if (context.ActionDescriptor.EndpointMetadata.OfType<AllowAnonymousAttribute>().Any()) return;
            var user = (User) context.HttpContext.Items["User"];
            if (user == null)
            {
                context.Result = new JsonResult(new {message = "Unauthorized"}) {StatusCode = StatusCodes.Status401Unauthorized };
                context.HttpContext.Response.Headers["WWW-Authenticate"] = "Basic realm=\"\", charset =\"UTF-8\"";
            }
        }
    }
}
