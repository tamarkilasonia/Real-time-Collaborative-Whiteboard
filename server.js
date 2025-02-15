const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files (you can place your front-end files in "public" folder)
app.use(express.static("public"));

io.on("connection", (socket) => {
    console.log("A user connected");

    // Example: Sending a message from server to client
    socket.emit("message", "Welcome to the real-time server!");

    // Handling messages from client
    socket.on("chat", (msg) => {
        console.log("Message from client:", msg);
        io.emit("chat", msg); // Broadcast message to all clients
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
