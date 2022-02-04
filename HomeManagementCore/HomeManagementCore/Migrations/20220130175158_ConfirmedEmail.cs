using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HomeManagementCore.Migrations
{
    public partial class ConfirmedEmail : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "ConfirmedEmail",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ConfirmedEmail",
                table: "Users");
        }
    }
}
