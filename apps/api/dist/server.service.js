import { prisma } from "./server.lib.js";
export const createLink = async (original, short) => {
    return prisma.shortLink.create({
        data: { original, short },
    });
};
export const getAllLinks = async () => {
    return prisma.shortLink.findMany({
        orderBy: { createdAt: "desc" },
    });
};
export const getLinkByShort = async (short) => {
    return prisma.shortLink.findUnique({ where: { short } });
};
export const getLinkById = async (id) => {
    return prisma.shortLink.findUnique({ where: { id } });
};
export const incrementAccess = async (short) => {
    return prisma.shortLink.update({
        where: { short },
        data: { access: { increment: 1 } },
    });
};
export const deleteLink = async (id) => {
    return prisma.shortLink.delete({ where: { id } });
};
export const updateLink = async (id, original, short) => {
    return prisma.shortLink.update({
        where: { id },
        data: { original, short },
    });
};
//# sourceMappingURL=server.service.js.map