using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Owin;
using ShipmentsApi;
using System.Web.Http;
using System;

[assembly: OwinStartup(typeof(Startup))]
namespace ShipmentsApi
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var config = new HttpConfiguration();
                        
            WebApiConfig.Register(config);

            ConfigureAuthZero(app);

            app.UseCors(CorsOptions.AllowAll);
            app.UseWebApi(config);
        }
    }
}