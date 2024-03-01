const { Server } = require("socket.io")


const io = new Server(8000, {cors:true})

const patientEmailToCheckMap = new Map();
const doctorEmailToCheckMap = new Map();
const socketIdToEmailMap = new Map();

io.on("connection", (socket) => {
  console.log(`a user connected: ${socket.id}`);
  socket.on("connectToDoctor:Connect", (msg) => {
    console.log(msg);
    const { patientEmail,patientName,patientId } = msg;
    patientEmailToCheckMap.set(patientEmail, socket.id);
    socketIdToEmailMap.set(socket.id, patientEmail);
    io.to(patientId).emit("user:joined", { patientEmail,id:socket.id});
    socket.join(patientId);
    
    socket.to("connectToDoctor:Connect").emit("connectToDoctor:Connect", msg); 
    io.emit("connectToDoctor:Connect", msg);
  });
  socket.on("disconnected:EndCall", () => {
    console.log(`user disconnected: ${socket.id}`);
  });
}
);



// const express = require("express");
// const { createServer } = require("node:http");
// const { join } = require("node:path");
// const { Server } = require("socket.io");
// const  port =8000
// const app = express();
// const server = createServer(app);
// const io = new Server(server);


// io.on("connection", (socket) => {
//   console.log(`a user connected`+ socket.id);
// });

// server.listen(port, () => {
//   console.log(`server running at http://localhost:${port}`);
// });