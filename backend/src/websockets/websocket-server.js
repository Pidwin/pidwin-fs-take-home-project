import jwt from "jsonwebtoken";
import { Server } from "socket.io";

// Map of users and instance of socket associated to specific user
const sockUsers = {};
let io;
// Send message to a specific user
const sendMsgToUser = (userId, message) => {
  console.log("User Id " + userId);
  console.log(JSON.stringify(sockUsers));
  console.log(sockUsers[userId]);
  try {
    if (sockUsers[userId]) {
      io.to(sockUsers[userId]).emit(
        "gameResultToUser",
        JSON.stringify(message)
      );
    } else {
      console.log(`User is not connected or WebSocket is closed.`);
    }
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

const broadcastMessage = (message) => {
  const messageString = JSON.stringify(message);
  // const websocketInstances = Object.values(sockUsers);
  // for (let i = 0; i < websocketInstances.length; i++) {
  //   // websocketInstances is holding instance of socket
  //   if (websocketInstances[i].connected) {
  //     // With the instances saved in the map, broadcast message to all
  //     websocketInstances[i].emit(messageString);
  //   }
  // }

  io.emit("broadcastMessage", messageString);
};
function setupWebSocketServer(server) {
  io = new Server(server);

  // Front Example
  // const socket = io(url, {
  //   auth: {
  //     token: token, // Send the token in the handshake
  //   },
  // });
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error("Token is required"));
    }

    try {
      let decodedData = verifyToken(token);
      if (!decodedData || !decodedData?._id) {
        next(new Error("Invalid or expired token"));
      }
      socket.userId = decodedData._id; // Attach user info to the socket
      sockUsers[decodedData._id] = socket.id;
      next();
    } catch (err) {
      console.error("Decoding Websocket Token failed:", err);
      next(new Error("Invalid or expired token"));
    }
  });

  io.on("connection", (socket) => {
    // Broadcast Welcome Message
    socket.emit("broadcastMessage", JSON.stringify({ message: "Welcome!" }));

    // Handles Incoming Messages, Not needed for now though
    socket.on("message", (message) => {
      console.log("Received:", message);
      // You can also process events in here for bets
    });

    // Disconnect user when they close or connection is lost
    socket.on("close", () => {
      delete sockUsers[socket.userId];
    });
  });
  return io;
}

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, "test");
    return decoded; // Returns decoded payload, which contains the user ID
  } catch (err) {
    console.error("Decoding Token failed:", err);
    return null;
  }
};
export { setupWebSocketServer, sendMsgToUser, broadcastMessage };
