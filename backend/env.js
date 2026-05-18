import { env as loadEnv } from 'custom-env';
import { z } from 'zod';


process.env.APP_STAGE = process.env.APP_STAGE ?? 'dev';

const isProduction = process.env.APP_STAGE === 'production'
const isDev = process.env.APP_STAGE === 'dev';
const isTest = process.env.APP_STAGE === 'test';


if(isDev) {
    loadEnv('dev')
}else if(isTest) {
    loadEnv('test')
}

const envSchema = z.object({
    NODE_ENV: z
        .enum(['development', 'production', 'test'])
        .default('development'),
    
    APP_STAGE: z
        .enum(['dev', 'production', 'test'])
        .default('dev'),

    PORT: z.coerce.number().int().positive().default(3030),

    DATABASE_URL: z.string().refine(
        (val) => val.startsWith("mongodb+srv://") || val.startsWith("mongodb://"), 
        {
            message: 'URL most start with mongodb:// or mongodb+srv://',
            path: ['DATABASE_URL']
        }
    ),

    KEY_SECRET: z.string().min(30),
    BCRYPT_SALT_ROUNDS: z.coerce.number().positive().default(10),
    JWT_EXPIRES_IN: z.string().default("7d")
})

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error("Invalid environment variables:", env.error.format());
  process.exit(1);
}

export const ENV = env.data;
