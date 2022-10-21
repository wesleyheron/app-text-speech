import { UserData, UseCase } from "../ports/index"
import { Either } from "../../shared/either"
import { UserNotFoundError, WrongPasswordError } from '../authentication/errors/index'
import { AuthenticationResult, AuthenticationService } from "../authentication/ports"

export class SignIn implements UseCase {
    private readonly authentication: AuthenticationService
  
    constructor (authentication: AuthenticationService) {
      this.authentication = authentication
    }
  
    public async perform (signinRequest: UserData):
      Promise<Either<UserNotFoundError | WrongPasswordError, AuthenticationResult>> {
      return await this.authentication.auth(
        {
          email: signinRequest.email,
          password: signinRequest.password
        }
      )
    }
  }