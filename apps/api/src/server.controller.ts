import { FastifyReply, FastifyRequest } from "fastify";
import * as linkService from "./server.service.js";

export const createLink = async (
  req: FastifyRequest<{ Body: { original: string; short: string } }>,
  reply: FastifyReply,
) => {
  const { original, short } = req.body;

  try {
    const exist = await linkService.getLinkByShort(short);
    if (exist) return reply.status(400).send({ error: "Short already exists" });

    const link = await linkService.createLink(original, short);
    reply.send(link);
  } catch (err) {
    reply.status(500).send({ error: "Internal server error" });
  }
};

export const getLinks = async (req: FastifyRequest, reply: FastifyReply) => {
  const links = await linkService.getAllLinks();
  reply.send(links);
};

export const getLinkById = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) => {
  const { id } = req.params;
  const link = await linkService.getLinkById(id);
  if (!link) return reply.status(404).send({ error: "Link not found" });

  reply.send(link);
}

export const redirectLink = async (
  req: FastifyRequest<{ Params: { short: string } }>,
  reply: FastifyReply,
) => {
  const { short } = req.params;
  const link = await linkService.getLinkByShort(short);

  if (!link) return reply.status(404).send({ error: "Link not found" });

  await linkService.incrementAccess(short);

  reply.redirect(link.original);
};

export const deleteLink = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) => {
  const { id } = req.params;
  await linkService.deleteLink(id);
  reply.send({ message: "Deleted successfully" });
};

export const updateLink = async (
  req: FastifyRequest<{
    Params: { id: string };
    Body: { original: string; short: string };
  }>,
  reply: FastifyReply,
) => {
  const { id } = req.params;
  const { original, short } = req.body;

  const originalLink = await linkService.getLinkById(id);
  if (!originalLink) return reply.status(404).send({ error: "Link not found" });

  const updated = await linkService.updateLink(id, original, short);
  reply.send(updated);
};
