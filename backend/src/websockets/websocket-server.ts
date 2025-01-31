import jwt from "jsonwebtoken";
import { Server, Socket } from "socket.io";

import { Server as HttpServer } from "http";

interface DecodedToken {
  _id: string;
}

interface AuthenticatedSocket extends Socket {
  userId?: string;
}

const sockUsers: Record<string, string> = {};
let io: Server;

const sendMsgToUser = (userId: string, message: unknown): void => {
  try {
    if (sockUsers[userId]) {
      io.to(sockUsers[userId]).emit(
        "gameResultToUser",
        JSON.stringify(message)
      );
    } else {
      console.log("User is not connected or WebSocket is closed.");
    }
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

const broadcastMessage = (message: object): void => {
  try {
    const messageString = JSON.stringify(message);
    io.emit("broadcastMessage", messageString);
  } catch (err) {
    console.log(err);
  }
};

const setupWebSocketServer = (server: HttpServer): Server => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.use((socket: AuthenticatedSocket, next) => {
    const token = socket.handshake.auth.token as string | undefined;

    if (!token) {
      return next(new Error("Token is required"));
    }

    try {
      const decodedData = verifyToken(token);
      if (!decodedData || !decodedData._id) {
        return next(new Error("Invalid or expired token"));
      }
      socket.userId = decodedData._id;
      sockUsers[decodedData._id] = socket.id;
      next();
    } catch (err) {
      console.error("Decoding Websocket Token failed:", err);
      next(new Error("Invalid or expired token"));
    }
  });

  io.on("connection", (socket: AuthenticatedSocket) => {
    socket.emit("broadcastMessage", JSON.stringify({ message: "Welcome!" }));

    socket.on("message", (message: string) => {
      console.log("Received:", message);
    });

    socket.on("disconnect", () => {
      if (socket.userId) {
        delete sockUsers[socket.userId];
      }
    });
  });

  return io;
};

const verifyToken = (token: string): DecodedToken | null => {
  try {
    const decoded = jwt.verify(token, "test") as DecodedToken;
    return decoded;
  } catch (err) {
    console.error("Decoding Token failed:", err);
    return null;
  }
};

export { setupWebSocketServer, sendMsgToUser, broadcastMessage };
