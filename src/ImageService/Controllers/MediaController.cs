using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace ImageService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MediaController : ControllerBase
    {

        public Cloudinary _cloudinary;

        public MediaController(Cloudinary cloudinary)
        {
            _cloudinary = cloudinary;
        }

        [HttpPost("upload/auction/{auctionId}")]
        [Consumes("multipart/form-data")] 
        public IActionResult UploadAuctionImage([FromForm]IFormFile image, [FromRoute]string auctionId, [FromForm] string imageType)
        {
            string folderPath = $"auctions/{auctionId}";
            return UploadImageToCloudinary(image, folderPath, imageType);
        }


        private IActionResult UploadImageToCloudinary(IFormFile image, string folderPath, string imageType)
        {
            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription(image.FileName, image.OpenReadStream()),
                Folder = folderPath,
                Tags = imageType, 
                UseFilename = true,
                UniqueFilename = false,
                Overwrite = false 
            };
            var uploadResult = _cloudinary.Upload(uploadParams);
            if (uploadResult.StatusCode == System.Net.HttpStatusCode.OK)
            {
                return Ok(new { Url = uploadResult.SecureUrl.AbsoluteUri });
            }
            return BadRequest("Image upload failed.");
        }
    }
}
