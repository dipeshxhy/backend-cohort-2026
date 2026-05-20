import z from 'zod';

const envSchema = z.object({
  PORT: z
    .string()
    .transform((value) => parseInt(value, 10))
    .default(8000),
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
