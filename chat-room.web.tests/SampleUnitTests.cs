using System.Linq;
using chat_room.web.Controllers;
using chat_room.web.Data;
using Microsoft.VisualStudio.TestTools.UnitTesting;
    
namespace chat_room.tests
{
    [TestClass]
    public class SampleUnitTests
    {
        [TestMethod]
        public async void GetUsersTest()
        {
            var controller = new UserController(new ChatRoomContext());
            var users = await controller.GetUsers();
            Assert.AreEqual(2, actual: users.Value.ToList());
        }

    }
}
