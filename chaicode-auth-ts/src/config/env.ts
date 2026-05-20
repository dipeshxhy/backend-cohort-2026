import z from 'zod';

const envSchema = z.object({
  PORT: z
    .string()
    .transform((value) => parseInt(value, 10))
    .default(8000),
  DATABASE_URL: z.url(
    'Invalid DATABASE_URL. It should be a valid URL pointing to your PostgreSQL database.',
  ),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  JWT_SECRET: z
    .string()
    .min(32, 'JWT_SECRET must be at least 32 characters long'),
  JWT_EXPIRES_IN: z.string().default('1h'),
});

function getEnv(env: NodeJS.ProcessEnv) {
  const result = envSchema.safeParse(env);
  if (!result.success) {
    console.error('Invalid environment variables:', result.error.format());
    process.exit(1);
  }
  return result.data;
}
export const env = getEnv(process.env);
