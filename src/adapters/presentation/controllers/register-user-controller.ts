import { HttpRequest, HttpResponse } from './ports/http'
import { MissingParamError } from './errors/missing-param-error'
import { badRequest, serverError, ok } from './helpers/http-helper'
//import { Regis }

export class RegisterUserController {
    private readonly registerUser: RegisterUser
    //private readonly sendEmailToUser: 

    constructor (registerUser: RegisterUser) {
        this.registerUser = registerUser
    }

   async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
        if(!httpRequest.body.name || !httpRequest.body.email) {
            const field = !httpRequest.body.name ? 'name' : 'email'
            return badRequest(new MissingParamError(field))
        }
        const userData = { name: httpRequest.body.name, email: httpRequest.body.email }
        const registerUserResponse: RegisterUserResponse = await this.registerUser.readdirSync
    }
   }

}