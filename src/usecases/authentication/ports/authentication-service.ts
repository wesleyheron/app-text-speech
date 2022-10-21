import { Either } from "../../../shared/either"
import { UserNotFoundError, WrongPasswordError } from "../errors/index"

export type AuthenticationParams = {
    email: string
    password: string
  }
  
  export type AuthenticationResult = {
    accessToken: string
    id: string
  }
  
  export interface AuthenticationService {
    auth: (authenticationParams: AuthenticationParams) =>
      Promise<Either<UserNotFoundError | WrongPasswordError, AuthenticationResult>>
  }