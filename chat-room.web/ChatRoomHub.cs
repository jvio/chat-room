using Microsoft.AspNetCore.SignalR;

namespace ChatRoom.Web
{
    public class ChatRoomHub: Hub
    {
        public void SendToAll(string name, string message)
        {
            Clients.All.SendAsync("sendToAll", name, message);
        }
    }
}