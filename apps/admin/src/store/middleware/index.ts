import { api } from '@/services'
import { errorMiddleware } from './error'

export const middleware = [api.middleware, errorMiddleware]
