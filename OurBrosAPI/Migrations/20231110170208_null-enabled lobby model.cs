using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace OurBrosAPI.Migrations
{
    /// <inheritdoc />
    public partial class nullenabledlobbymodel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Lobbies_LobbyId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_LobbyId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "LobbyId",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Users",
                newName: "userpassword");

            migrationBuilder.RenameColumn(
                name: "LobbyName",
                table: "Lobbies",
                newName: "lobbyname");

            migrationBuilder.AddColumn<string>(
                name: "username",
                table: "Users",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "lobbyowner",
                table: "Lobbies",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "lobbypassword",
                table: "Lobbies",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "usercount",
                table: "Lobbies",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Lobbies",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "lobbyowner", "lobbypassword", "usercount" },
                values: new object[] { null, null, null });

            migrationBuilder.UpdateData(
                table: "Lobbies",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "lobbyowner", "lobbypassword", "usercount" },
                values: new object[] { null, null, null });

            migrationBuilder.UpdateData(
                table: "Lobbies",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "lobbyowner", "lobbypassword", "usercount" },
                values: new object[] { null, null, null });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "username", "userpassword" },
                values: new object[,]
                {
                    { 1, "TestUser1", "1234" },
                    { 2, "TestUser2", "1234" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DropColumn(
                name: "username",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "lobbyowner",
                table: "Lobbies");

            migrationBuilder.DropColumn(
                name: "lobbypassword",
                table: "Lobbies");

            migrationBuilder.DropColumn(
                name: "usercount",
                table: "Lobbies");

            migrationBuilder.RenameColumn(
                name: "userpassword",
                table: "Users",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "lobbyname",
                table: "Lobbies",
                newName: "LobbyName");

            migrationBuilder.AddColumn<int>(
                name: "LobbyId",
                table: "Users",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_LobbyId",
                table: "Users",
                column: "LobbyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Lobbies_LobbyId",
                table: "Users",
                column: "LobbyId",
                principalTable: "Lobbies",
                principalColumn: "Id");
        }
    }
}
