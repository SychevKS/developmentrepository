using Keycloak.AuthServices.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options => options.AddPolicy("CorsPolicy",
    builder =>
    {
        builder.WithOrigins("https://localhost:5173/");
    }));

builder.Services.AddScoped<ApplicationDbContext>();

var config = builder.Configuration;

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddKeycloakWebApi(
    options =>
    {
        options.Resource = "client";
        options.Realm = "developrepository";
        options.SslRequired = "none";
        options.AuthServerUrl = "http://keycloak:8080/";
        options.VerifyTokenAudience = false;
    },
    options =>
    {
        // Для локального развертывания в докере, так как фронт и бек не могут тыкать в один и тот же внешний keycloak.
        options.TokenValidationParameters.ValidIssuer = "http://localhost:9001/realms/developrepository";
    });

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CorsPolicy");

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers().RequireAuthorization();

app.MapFallbackToFile("/index.html");

app.Run();
