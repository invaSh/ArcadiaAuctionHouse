using CloudinaryDotNet;
using dotenv.net;
using ImageService.Consumers;
using MassTransit;
using MongoDB.Driver;
using MongoDB.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;


// Set your Cloudinary credentials
//=================================

DotEnv.Load(options: new DotEnvOptions(probeForEnv: true));
Console.WriteLine($"Cloudinary URL: {Environment.GetEnvironmentVariable("CLOUDINARY_URL")}");
Cloudinary cloudinary = new Cloudinary(Environment.GetEnvironmentVariable("CLOUDINARY_URL"));
Console.WriteLine($"Debug: Cloudinary URL - '{cloudinary}'");
cloudinary.Api.Secure = true;


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton(cloudinary);
builder.Services.AddControllers();

builder.Services.AddMassTransit(x =>
{
    x.AddConsumersFromNamespaceContaining<AuctionCreatedConsumer>();


    x.SetEndpointNameFormatter(new KebabCaseEndpointNameFormatter("images", false));

    x.UsingRabbitMq((context, cfg) =>
    {
        cfg.Host(builder.Configuration["RabbitMq:Host"], "/", host =>
        {
            host.Username(builder.Configuration.GetValue<string>("RabbitMq:Username", "guest"));
            host.Password(builder.Configuration.GetValue<string>("RabbitMq:Password", "guest"));
        });

        cfg.ReceiveEndpoint("images-auction-created", e =>
        {
            e.UseMessageRetry(r => r.Interval(5, 5));

            e.ConfigureConsumer<AuctionCreatedConsumer>(context);
        });

        cfg.ConfigureEndpoints(context);
    });
});



builder.Services.AddEndpointsApiExplorer();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = builder.Configuration["IdentityServiceUrl"];
        options.RequireHttpsMetadata = false;
        options.TokenValidationParameters.ValidateAudience = false;
        options.TokenValidationParameters.NameClaimType = "name";
    });

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", builder =>
        builder.WithOrigins("http://localhost:3000")
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials());
});

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

var app = builder.Build();


app.UseHttpsRedirection();

app.UseRouting();
app.UseCors("CorsPolicy");

app.UseAuthentication();

app.MapControllers();

await DB.InitAsync("ImageDb", MongoClientSettings
    .FromConnectionString(builder.Configuration.GetConnectionString("ImageConnection")));

app.Run();
