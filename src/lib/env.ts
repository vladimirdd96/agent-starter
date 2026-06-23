import { z } from 'zod'

/**
 * Add your project's env vars here. Types are inferred — never declare manually.
 * Import `env` throughout the codebase; never read process.env directly.
 *
 * Usage: import { env } from '@/lib/env'
 */
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),

  // --- Add your vars below ---
  // DATABASE_URL: z.string().url(),
  // API_KEY: z.string().min(1),
  // PORT: z.coerce.number().int().positive().default(3000),
})

export const env = envSchema.parse(process.env)
export type Env = z.infer<typeof envSchema>
