using IdentityService.DTOs;
using IdentityService.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Threading.Tasks;

namespace IdentityService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public UsersController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetAllUsers()
        {
            var users = await _userManager.Users.ToListAsync();

            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetUserById(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest("User ID must be provided.");
            }

            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound($"User with ID {id} not found.");
            }


            return Ok(user);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> CreateUser(UserDto user)
        {
            try
            {
                if (user == null)
                    return BadRequest("User data must be provided.");

                var newUser = new ApplicationUser { UserName = user.Username, Email = user.Email, FullName = user.FullName };
                var result = await _userManager.CreateAsync(newUser, user.Password);

                if (!result.Succeeded)
                    return BadRequest(result.Errors);

                if (user.Role == null) return BadRequest("Role cannot be empty");

                var roleResult = await _userManager.AddToRoleAsync(newUser, user.Role);
                if (!roleResult.Succeeded) return BadRequest(roleResult.Errors);

                return Ok(new { message = "User created successfully", userId = newUser.Id });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal Server Error", error = ex.Message });
            }
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateUser(string id, UpdateUserDto user)
        {
            if (user == null)
            {
                return BadRequest("User data must be provided.");
            }

            var existingUser = await _userManager.FindByIdAsync(id);
            if (existingUser == null)
            {
                return NotFound($"User with ID {id} not found.");
            }

            existingUser.UserName = user.Username ?? existingUser.UserName;
            existingUser.Email = user.Email ?? existingUser.Email;
            existingUser.FullName = user.FullName ?? existingUser.FullName;


            if (!string.IsNullOrWhiteSpace(user.Password))
            {
                // Check if OldPassword is provided and correct
                if (string.IsNullOrWhiteSpace(user.OldPassword))
                {
                    return BadRequest("Old password must be provided to change the password.");
                }

                var isOldPasswordCorrect = await _userManager.CheckPasswordAsync(existingUser, user.OldPassword);
                if (!isOldPasswordCorrect)
                {
                    return BadRequest("Old password is incorrect.");
                }

                // Remove the existing password and add the new password
                var removePasswordResult = await _userManager.RemovePasswordAsync(existingUser);
                if (!removePasswordResult.Succeeded)
                {
                    return BadRequest(removePasswordResult.Errors);
                }

                var addPasswordResult = await _userManager.AddPasswordAsync(existingUser, user.Password);
                if (!addPasswordResult.Succeeded)
                {
                    return BadRequest(addPasswordResult.Errors);
                }
            }

            if (!string.IsNullOrWhiteSpace(user.Role))
            {
                var currentRoles = await _userManager.GetRolesAsync(existingUser);

                var removeRolesResult = await _userManager.RemoveFromRolesAsync(existingUser, currentRoles);
                if (!removeRolesResult.Succeeded)
                {
                    return BadRequest(removeRolesResult.Errors);
                }

                var addRoleResult = await _userManager.AddToRoleAsync(existingUser, user.Role);
                if (!addRoleResult.Succeeded)
                {
                    return BadRequest(addRoleResult.Errors);
                }
            }


            var result = await _userManager.UpdateAsync(existingUser);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok(new { message = "User updated successfully", userId = existingUser.Id });
        }


        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound($"User with ID {id} not found.");
            }

            var result = await _userManager.DeleteAsync(user);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok(new { message = "User deleted successfully", userId = id });
        }



    }
}
