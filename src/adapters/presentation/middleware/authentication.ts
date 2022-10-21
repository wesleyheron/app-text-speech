import { Middleware } from '../controllers/ports/middleware'
import { ok, serverError, forbidden } from "../controllers/helpers/http-helper"
import { HttpResponse } from "../controllers/ports/http"



export type AuthRequest = {
    accessToken: string,
    requesterId: string
}

export class Authentication implements Middleware {
    private readonly tokenManager: TokenManager

    constructor (tokenManager: TokenManager) {
        this.tokenManager = tokenManager
    }

    async handle (request: AuthRequest): Promise<HttpResponse> {
        try {
            const { accessToken, requesterId } = request
            if(!accessToken || !requesterId) {
                return forbidden(new Error('Invalid token or requester id.'))
            }

            const decodedTokenOrError = await this.tokenManager.verify(accessToken)
            if(decodedTokenOrError.isLeft()) {
                return forbidden(decodedTokenOrError.value)
            }

            const payload: Payload = decodedTokenOrError.value as Payload

            if(payload.id === requesterId) {
                return ok(payload)
            }

            return forbidden(new Error('User not allowed to perform this operation.'))
        } catch (error) {
            return serverError(error)
        }
    }
}