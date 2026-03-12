import Fastify from "fastify";
import cors from "@fastify/cors";
import { linkRoutes } from "./server.route.js";
import "dotenv/config";

const server = Fastify({ logger: true });

// CORS
await server.register(cors, {
  origin: (origin, callback) => {
    const allowedOrigins = [process.env.FRONTEND_URL];

    if (!origin) {
      callback(null, true);
      return;
    }

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"), false);
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
});

// Routes
server.register(linkRoutes);

// Logging hook
server.addHook("onRequest", async (req) => {
  server.log.info({ url: req.url }, "Incoming request");
});

// Start
const start = async () => {
  try {
    const PORT = Number(process.env.PORT) || 3333;
    const address = await server.listen({ port: PORT, host: "0.0.0.0" });
    server.log.info(`🚀 Server running at ${address}`);
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

start();
