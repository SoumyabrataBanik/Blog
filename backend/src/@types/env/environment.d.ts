declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: number;
            MONGODB_URI: string;
            JWT_SECRET_TOKEN: string;
        }
    }
}

export {};
