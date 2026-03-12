import { FastifyInstance } from "fastify";
import * as linkController from "./server.controller.js";

export async function linkRoutes(fastify: FastifyInstance) {
  fastify.post("/links", linkController.createLink);
  fastify.get("/links", linkController.getLinks);
  fastify.get("/links/:short", linkController.redirectLink);
  fastify.delete("/links/:id", linkController.deleteLink);
  fastify.put("/links/:id", linkController.updateLink);
}
