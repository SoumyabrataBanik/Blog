import { Express } from "express-serve-static-core";

declare module "express-serve-static-core" {
    export interface Request {
        user?: unknown | undefined;
    }

    export interface Response {
        user?: unknown | undefined;
    }
}
