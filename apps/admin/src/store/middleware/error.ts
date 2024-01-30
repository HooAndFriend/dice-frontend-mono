import type { Middleware, MiddlewareAPI } from '@reduxjs/toolkit'

// display a toast when an action is rejected without handling error
export const errorMiddleware: Middleware =
  (_api: MiddlewareAPI) => (next) => (action) =>
    next(action)
