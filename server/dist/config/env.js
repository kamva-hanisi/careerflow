import dotenv from "dotenv";
import { z } from "zod";
dotenv.config();
const envSchema = z.object({
    PORT: z.coerce.number().default(4000),
    CLIENT_URL: z.string().url().default("http://localhost:5173"),
    DB_HOST: z.string().default("localhost"),
    DB_PORT: z.coerce.number().default(3306),
    DB_NAME: z.string().default("careerflow"),
    DB_USER: z.string().default("root"),
    DB_PASSWORD: z.string().default(""),
    JWT_SECRET: z.string().min(8, "JWT_SECRET must be at least 8 characters")
});
export const env = envSchema.parse(process.env);
