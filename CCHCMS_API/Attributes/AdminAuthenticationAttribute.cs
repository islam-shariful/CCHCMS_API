using CCHCMS_API.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Principal;
using System.Text;
using System.Threading;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace CCHCMS_API.Attributes
{
    public class AdminAuthenticationAttribute : AuthorizationFilterAttribute
    {
        public override void OnAuthorization(HttpActionContext actionContext)
        {
            base.OnAuthorization(actionContext);
            if (actionContext.Request.Headers.Authorization == null)
            {
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
            }
            else
            {
                UserRepository userRepository = new UserRepository();

                string encodedString = actionContext.Request.Headers.Authorization.Parameter;
                string decodedString = Encoding.UTF8.GetString(Convert.FromBase64String(encodedString));
                string[] splittedText = decodedString.Split(new char[] { ':' });
                string userId = splittedText[0];
                string password = splittedText[1];
                var userInfo = userRepository.Get(Int32.Parse(userId));
                if (password == userInfo.Password && userInfo.Role == "admin")
                {
                    Thread.CurrentPrincipal = new GenericPrincipal(new GenericIdentity(userId), null);
                }
                else
                {
                    actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);

                }


            }
        }
    }
}