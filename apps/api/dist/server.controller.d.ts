import { FastifyReply, FastifyRequest } from "fastify";
export declare const createLink: (req: FastifyRequest<{
    Body: {
        original: string;
        short: string;
    };
}>, reply: FastifyReply) => Promise<undefined>;
export declare const getLinks: (req: FastifyRequest, reply: FastifyReply) => Promise<void>;
export declare const getLinkById: (req: FastifyRequest<{
    Params: {
        id: string;
    };
}>, reply: FastifyReply) => Promise<undefined>;
export declare const redirectLink: (req: FastifyRequest<{
    Params: {
        short: string;
    };
}>, reply: FastifyReply) => Promise<undefined>;
export declare const deleteLink: (req: FastifyRequest<{
    Params: {
        id: string;
    };
}>, reply: FastifyReply) => Promise<void>;
export declare const updateLink: (req: FastifyRequest<{
    Params: {
        id: string;
    };
    Body: {
        original: string;
        short: string;
    };
}>, reply: FastifyReply) => Promise<undefined>;
