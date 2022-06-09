const express=require('express');
const cors=require('cors');

require('dotenv').config({ path: "./config.env" });
const PORT = process.env.PORT || 3001;

const http = require('http');

const app = express();
console.log("socket run on server shivamTECH")
// !todo
const server = http.createServer(app);
// !imp
const io = require("socket.io")(server, {
  pingTimeout: 20000,
  pingInterval: 25000,
  cors: {
    origin: "*",
    credentials: true,
  },
});


// !

io.on("connection", (socket) => {
  console.log("Connected to socket.io",);
  socket.on("setup", (userId) => {
    console.log("userData",userId)
    // let id=userData.token_data.userid;
    // console.log(id)

    // socket.join(userData._id);
    socket.join(userId);



    // console.log(userData,"userData")
    socket.emit("connected");

   

  });


  // !1
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);

  });
 /*  socket.on("typing", (room:any) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room:any) => socket.in(room).emit("stop typing")); */

  socket.on("new message", (newMessageRecieved) => {
    console.log("new message",newMessageRecieved)
    var chat = newMessageRecieved.chat;
   
    if (!chat.users) return ("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
     /*  // !
      socket.in(newMessageRecieved._id).emit("message2",newMessageRecieved);
      //! */
    });
  });


 

  socket.off("setup", () => {
    // console.log("USER DISCONNECTED");
    // socket.leave(userData._id);
  });

  
});
// !imp-end


// !todo




server.listen(PORT, () => {
  console.log(`listening on  ,${PORT}`);
});
// TODO
// app.listen(nconf.get('port'), () => {
//   console.log("Auth Service is running on port", nconf.get('port'));
//   Logger.debug(`Server is up and running @ http://localhost:${nconf.get('port')}`);
// });
// todo