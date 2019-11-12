using System;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace chat_room.web.Controllers.Extensions
{
    public static class SessionExtensions
    {
        public static void Set<T>(this ISession session, string key, T value)
        {
            session.SetString(key, JsonConvert.SerializeObject(value));
        }

        public static T Get<T>(this ISession session, string key)
        {
            var value = session.GetString(key);

            return value == null ? default(T) : 
                JsonConvert.DeserializeObject<T>(value);
        }
        
        public static void SetInt64(this ISession session, string key, long value)
        {
            session.SetString(key, value.ToString());
        }
        
        public static long? GetInt64(this ISession session, string key)
        {
            var userIdStr = session.GetString(key);
            
            if (userIdStr == null)
            {
                return null;
            }
            
            return Convert.ToInt64(userIdStr);
        }
    }
}