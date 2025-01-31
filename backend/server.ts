import { app } from ".";
import connectDB from "./db";
import http from "http";
import { setupWebSocketServer } from "./src/websockets/websocket-server";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  const httpServer: http.Server = http.createServer(app);
  const io = setupWebSocketServer(httpServer);

  // Connect to MongoDB only when running the server(Easier Testing)
  await connectDB();
  const server = httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  process.on("SIGINT", () => {
    server.close(() => {
      console.log("Server shut down");
      process.exit(0);
    });
  });

  process.on("SIGTERM", () => {
    server.close(() => {
      console.log("Server shut down");
      process.exit(0);
    });
  });
};

startServer();
