using MassTransit;
using SearchService.Consumers.Auctions;
using SearchService.Consumers.Items;
using SearchService.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddMassTransit(x =>
{
    x.AddConsumersFromNamespaceContaining<ItemCreatedConsumer>();
    x.AddConsumersFromNamespaceContaining<AuctionCreatedConsumer>();


    x.SetEndpointNameFormatter(new KebabCaseEndpointNameFormatter("search", false));

    x.UsingRabbitMq((context, cfg) =>
    {
        cfg.Host(builder.Configuration["RabbitMq:Host"], "/", host =>
        {
            host.Username(builder.Configuration.GetValue("RabbitMq:Username", "guest"));
            host.Password(builder.Configuration.GetValue("RabbitMq:Password", "guest"));

        });

        cfg.ReceiveEndpoint("search-item-created", e =>
        {

            e.ConfigureConsumer<ItemCreatedConsumer>(context);
        });

        cfg.ReceiveEndpoint("search-auction-created", e =>
        {

            e.ConfigureConsumer<AuctionCreatedConsumer>(context);
        });


        cfg.ConfigureEndpoints(context);
    });
});

var app = builder.Build();
 

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

try
{
    await DBInitializer.InitDb(app);

}
catch (Exception e)
{
    Console.WriteLine(e);
}

app.Run();
