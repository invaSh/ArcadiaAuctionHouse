using Duende.IdentityServer.Models;
using Duende.IdentityServer.Services;
using IdentityModel;
using IdentityService.Models;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace IdentityService.Services
{
    public class CustomProfileService : IProfileService
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public CustomProfileService(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }
        public async Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            var user = await _userManager.GetUserAsync(context.Subject);

            if (user == null)
            {
                // Handle the case where the user could not be found
                return;
            }

            // Get existing claims from the user
            var existingClaims = await _userManager.GetClaimsAsync(user);

            // Define the claims to issue
            var claims = new List<Claim>
    {
        new Claim(JwtClaimTypes.Subject, user.Id),
        new Claim(JwtClaimTypes.Name, user.UserName),
        new Claim(JwtClaimTypes.Email, user.Email),
        new Claim(JwtClaimTypes.EmailVerified, user.EmailConfirmed.ToString(), ClaimValueTypes.Boolean),
        // Add any additional claims you need
    };

            // Add existing claims that match the requested claim types
            var requestedClaims = context.RequestedClaimTypes;
            foreach (var claim in existingClaims)
            {
                if (requestedClaims.Contains(claim.Type))
                {
                    claims.Add(claim);
                }
            }

            // Set the issued claims
            context.IssuedClaims = claims;
        }


        public Task IsActiveAsync(IsActiveContext context)
        {
            return Task.CompletedTask;
        }
    }
}
