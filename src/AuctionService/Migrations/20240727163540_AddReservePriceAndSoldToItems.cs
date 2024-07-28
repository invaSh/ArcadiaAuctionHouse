using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AuctionService.Migrations
{
    /// <inheritdoc />
    public partial class AddReservePriceAndSoldToItems : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ReservePrice",
                table: "Items",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Sold",
                table: "Items",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ReservePrice",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "Sold",
                table: "Items");
        }
    }
}
