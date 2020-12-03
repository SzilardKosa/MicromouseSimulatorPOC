using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using MicromouseSimulatorPOC.Data;
using MicromouseSimulatorPOC.Interfaces;
using MicromouseSimulatorPOC.Services;
using MicromouseSimulatorPOC.Models;

namespace MicromouseSimulatorPOC
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // DB settings
            services.Configure<MicromouseDatabaseSettings>(
                Configuration.GetSection(nameof(MicromouseDatabaseSettings)));

            services.AddSingleton<IMicromouseDatabaseSettings>(sp =>
                sp.GetRequiredService<IOptions<MicromouseDatabaseSettings>>().Value);

            // DB repository
            services.AddScoped(typeof(IMongoRepository<>), typeof(MongoRepository<>));

            // Service
            services.AddScoped<IMazeService, MazeService>();
            services.AddScoped<IUserCodeService, UserCodeService>();

            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
