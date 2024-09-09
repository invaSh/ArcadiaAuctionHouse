using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using MassTransit;
using Contracts;

namespace ImageService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MediaController : ControllerBase
    {

        private readonly Cloudinary _cloudinary;
        private readonly IPublishEndpoint _publishEndpoint;


        public MediaController(Cloudinary cloudinary, IPublishEndpoint publish)
        {
            _cloudinary = cloudinary;
            _publishEndpoint = publish;
        }

        [HttpPost("upload/auction/{auctionId}")]
        [Consumes("multipart/form-data")] 
        public IActionResult UploadAuctionImage([FromForm]IFormFile image, [FromRoute]string auctionId, [FromForm] string imageType)
        {
            Console.WriteLine($"Received image: {image?.FileName}, Type: {imageType}, Auction ID: {auctionId}");

            try
            {
                string folderPath = $"auctions/{auctionId}";
                var result = UploadImageToCloudinary(image, folderPath, imageType, auctionId );
                return result;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error during image upload: {ex.Message}");
                return BadRequest("Image upload failed.");
            }
        }


        private IActionResult UploadImageToCloudinary(IFormFile image, string folderPath, string imageType, string auctionId)
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
                var imageUrlEvent = new ImageUrlPublished
                {
                    AuctionId = Guid.Parse(auctionId),
                    ImageUrl = uploadResult.SecureUrl.AbsoluteUri ,
                    ImageType = imageType
                };

                _publishEndpoint.Publish(imageUrlEvent);
                return Ok(new { Url = uploadResult.SecureUrl.AbsoluteUri });
            }
            return BadRequest("Image upload failed.");
        }

        [HttpPost("upload/item/{itemId}")]
        [Consumes("multipart/form-data")]
        public IActionResult UploadItemImgToCloudinary(List<IFormFile> images, [FromRoute] Guid itemId)
        {
            if (images == null || images.Count == 0)
            {
                return BadRequest("No images provided.");
            }

            List<string> uploadedUrls = new List<string>();

            foreach (var image in images)
            {
                var uploadParams = new ImageUploadParams()
                {
                    File = new FileDescription(image.FileName, image.OpenReadStream()),
                    Folder = $"items/{itemId}",
                    Tags = "Image",
                    UseFilename = true,
                    UniqueFilename = false,
                    Overwrite = false
                };

                var uploadResult = _cloudinary.Upload(uploadParams);

                if (uploadResult.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    uploadedUrls.Add(uploadResult.SecureUrl.AbsoluteUri);
                    _publishEndpoint.Publish(new ImageUrlPublished
                    {
                        AuctionId = itemId,
                        ImageUrl = uploadResult.SecureUrl.AbsoluteUri,
                        ImageType = "item"
                    });
                }
            }

            if (uploadedUrls.Count > 0)
            {
                return Ok(new { Urls = uploadedUrls });
            }
            else
            {
                return BadRequest("Image upload failed for all images.");
            }
        }


    }
}
