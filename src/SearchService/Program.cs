using MassTransit;
using SearchService.Consumers.Items;
using SearchService.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddMassTransit(x =>
{
    x.AddConsumersFromNamespaceContaining<ItemCreatedConsumer>();

    x.SetEndpointNameFormatter(new KebabCaseEndpointNameFormatter("search", false));

    x.UsingRabbitMq((context, cfg) =>
    {
        cfg.ReceiveEndpoint("search-item-created", e =>
        {
            e.UseMessageRetry(r => r.Interval(30, 2));

            e.ConfigureConsumer<ItemCreatedConsumer>(context);
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
