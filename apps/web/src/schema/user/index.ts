import * as z from 'zod'

export const diceLoginSchema = z.object({
  email: z.string(),
  password: z.string(),
  fcmToken: z.string(),
})
