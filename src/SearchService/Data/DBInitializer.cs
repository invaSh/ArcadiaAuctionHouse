using MongoDB.Driver;
using MongoDB.Entities;
using SearchService.Models;
using System.Text.Json;

namespace SearchService.Data
{
    public class DBInitializer
    {
        public static async Task InitDb(WebApplication app)
        {
            await DB.InitAsync("SearchDb", MongoClientSettings
                .FromConnectionString(app.Configuration.GetConnectionString("MongoDbConnection")));

            await DB.Index<Item>()
               .Key(x => x.ArtistOrMaker, KeyType.Text)
               .Key(x => x.Title, KeyType.Text)
               .Key(x => x.YearOfCreation, KeyType.Text)
               .CreateAsync();


            var count = await DB.CountAsync<Item>();

            if (count == 0)
            {
                Console.WriteLine("No data - will attempt to seed");
                var itemData = await File.ReadAllTextAsync("Data/items.json");

                var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

                var items = JsonSerializer.Deserialize<List<Item>>(itemData, options);

                await DB.SaveAsync(items);
            }
        }
    }
}