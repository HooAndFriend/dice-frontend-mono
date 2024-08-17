import * as z from 'zod'

export const saveWorksapceSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  comment: z.string().min(1, 'Comment is required'),
  profile: z.string().min(1, 'Profile is required'),
})

export const inviteWorkspaceUserSchema = z.object({
  email: z.string().email('Invalid email'),
  role: z.string().min(1, 'Role is required'),
})
