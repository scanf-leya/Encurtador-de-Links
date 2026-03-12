import { prisma } from "./server.lib.js";

export const createLink = async (original: string, short: string) => {
  return prisma.shortLink.create({
    data: { original, short },
  });
};

export const getAllLinks = async () => {
  return prisma.shortLink.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const getLinkByShort = async (short: string) => {
  return prisma.shortLink.findUnique({ where: { short } });
};

export const getLinkById = async (id: string) => {
  return prisma.shortLink.findUnique({ where: { id } });
};

export const incrementAccess = async (short: string) => {
  return prisma.shortLink.update({
    where: { short },
    data: { access: { increment: 1 } },
  });
};

export const deleteLink = async (id: string) => {
  return prisma.shortLink.delete({ where: { id } });
};

export const updateLink = async (
  id: string,
  original: string,
  short: string,
) => {
  return prisma.shortLink.update({
    where: { id },
    data: { original, short },
  });
};
