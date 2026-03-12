export declare const createLink: (original: string, short: string) => Promise<{
    id: string;
    original: string;
    short: string;
    access: number;
    createdAt: Date;
}>;
export declare const getAllLinks: () => Promise<{
    id: string;
    original: string;
    short: string;
    access: number;
    createdAt: Date;
}[]>;
export declare const getLinkByShort: (short: string) => Promise<{
    id: string;
    original: string;
    short: string;
    access: number;
    createdAt: Date;
} | null>;
export declare const getLinkById: (id: string) => Promise<{
    id: string;
    original: string;
    short: string;
    access: number;
    createdAt: Date;
} | null>;
export declare const incrementAccess: (short: string) => Promise<{
    id: string;
    original: string;
    short: string;
    access: number;
    createdAt: Date;
}>;
export declare const deleteLink: (id: string) => Promise<{
    id: string;
    original: string;
    short: string;
    access: number;
    createdAt: Date;
}>;
export declare const updateLink: (id: string, original: string, short: string) => Promise<{
    id: string;
    original: string;
    short: string;
    access: number;
    createdAt: Date;
}>;
