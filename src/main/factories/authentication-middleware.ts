import { Middleware } from '../../usecases/'

export const makeAuthMiddleware = (): Middleware => {
    return new Authentication(makeTokenManager())
  }