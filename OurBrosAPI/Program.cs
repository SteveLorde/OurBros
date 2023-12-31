using Microsoft.EntityFrameworkCore;
using OurBrosAPI.Data;
using OurBrosAPI.Services.Authentication;
using OurBrosAPI.Services.Chat;
using OurBrosAPI.Services.Chat.Hubs;
using OurBrosAPI.Services.LobbiesService;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddSignalR();
builder.Services.AddDbContext<DataContext>(options => options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddTransient<IAuth, Auth>();
builder.Services.AddTransient<ILobbyService, LobbyService>();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(opt =>
{
    opt.AddPolicy(name: "CorsPolicy", builder =>
    {
        builder.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CorsPolicy");
app.UseHttpsRedirection();
app.MapHub<ChatHub>("/Chat");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();