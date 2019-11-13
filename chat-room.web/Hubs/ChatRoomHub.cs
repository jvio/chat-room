using Microsoft.AspNetCore.SignalR;

namespace chat_room.web.Hubs
{
    public class ChatRoomHub: Hub
    {
        public void SendToAll(MessageTypes type, long parentId)
        {
            Clients.All.SendAsync(Methods.SendAll, type, parentId);
        }
    }

    public static class Methods
    {
        public static string SendAll = "sendToAll";
    }

    public enum MessageTypes
    {
        Conversation = 1,
        Message = 2,
    }
}