import * as z from 'zod'

export const ticketSchema = z.object({
  name: z.string(),
})
