var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();

var app = builder.Build();

var configuredPathBase = builder.Configuration["Portfolio:PathBase"];
if (!string.IsNullOrWhiteSpace(configuredPathBase))
{
    var normalizedPathBase = configuredPathBase.StartsWith('/')
        ? configuredPathBase
        : $"/{configuredPathBase}";

    app.UsePathBase(normalizedPathBase.TrimEnd('/'));
}

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
    app.UseHttpsRedirection();
}

app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

app.Run();
