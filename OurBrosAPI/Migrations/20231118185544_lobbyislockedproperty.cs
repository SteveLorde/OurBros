using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OurBrosAPI.Migrations
{
    /// <inheritdoc />
    public partial class lobbyislockedproperty : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "islocked",
                table: "Lobbies",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Lobbies",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "islocked", "lobbypassword" },
                values: new object[] { true, "123456" });

            migrationBuilder.UpdateData(
                table: "Lobbies",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "islocked", "lobbypassword" },
                values: new object[] { true, "123456" });

            migrationBuilder.UpdateData(
                table: "Lobbies",
                keyColumn: "Id",
                keyValue: 3,
                column: "islocked",
                value: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "islocked",
                table: "Lobbies");

            migrationBuilder.UpdateData(
                table: "Lobbies",
                keyColumn: "Id",
                keyValue: 1,
                column: "lobbypassword",
                value: null);

            migrationBuilder.UpdateData(
                table: "Lobbies",
                keyColumn: "Id",
                keyValue: 2,
                column: "lobbypassword",
                value: null);
        }
    }
}
