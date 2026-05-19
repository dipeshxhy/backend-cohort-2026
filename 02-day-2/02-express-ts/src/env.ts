import { z } from 'zod';

const envSchema = z.object({
  PORT: z
    .string()
    .transform((value) => parseInt(value, 10))
    .default(8000),
  NODE_ENV: z.enum(['development', 'production', 'test']),
});

function createEnv(env: NodeJS.ProcessEnv) {
  const safeParseResult = envSchema.safeParse(env);
  if (!safeParseResult.success) {
    console.error(
      'Environment variable validation failed:',
      safeParseResult.error,
    );
    throw new Error(safeParseResult.error.message);
  }

  return safeParseResult.data;
}

export const env = createEnv(process.env);
