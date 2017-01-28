using Microsoft.Owin.Security;
using Microsoft.Owin.Security.DataHandler.Encoder;
using Microsoft.Owin.Security.Jwt;
using Owin;
using System;
using System.Configuration;

namespace ShipmentsApi
{
    public partial class Startup
    {
        private void ConfigureAuthZero(IAppBuilder app)
        {
            var issuer = ConfigurationManager.AppSettings["auth0:Domain"];
            var audience = ConfigurationManager.AppSettings["auth0:ClientId"];
            var secret = Base64UrlToBase64(ConfigurationManager.AppSettings["auth0:ClientSecret"]);

            app.UseJwtBearerAuthentication(new JwtBearerAuthenticationOptions
            {
                AuthenticationMode = AuthenticationMode.Active,
                AllowedAudiences = new[] { audience },
                IssuerSecurityTokenProviders = new[] { new SymmetricKeyIssuerSecurityTokenProvider(issuer, secret) }
            });
        }

        private string Base64UrlToBase64(string base64Url)
        {
            return TextEncodings.Base64.Encode(TextEncodings.Base64Url.Decode(base64Url));
        }
    }
}