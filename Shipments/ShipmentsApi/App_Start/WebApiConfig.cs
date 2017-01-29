using Newtonsoft.Json.Serialization;
using ShipmentsApi.App_Start;
using System.Web.Configuration;
using System.Web.Http;

namespace ShipmentsApi
{
    public class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional });

            config.MessageHandlers.Add(new JsonWebTokenValidationHandler()
            {
                Audience = WebConfigurationManager.AppSettings["auth0:ClientId"],
                SymmetricKey = WebConfigurationManager.AppSettings["auth0:ClientSecret"],
                IsSecretBase64Encoded = false
            });

            var jsonFormatter = config.Formatters.JsonFormatter;
            jsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
        }
    }
}