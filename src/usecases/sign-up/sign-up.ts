import { Either, right, left } from "../../shared/either"
import { UserData, UserRepository, Encoder, UseCase } from '../ports/index'
import { AuthenticationResult, AuthenticationService } from "../authentication/ports"
import { User } from "../../entities"
import { ExistingUserError } from "./errors"
import { InvalidEmailError, InvalidPasswordError } from "../../entities/errors"

export class SignUp implements UseCase {
    private readonly userRepository: UserRepository
    private readonly encoder: Encoder
    private readonly authentication: AuthenticationService
  
    constructor (userRepository: UserRepository, encoder: Encoder, authentication: AuthenticationService) {
      this.userRepository = userRepository
      this.encoder = encoder
      this.authentication = authentication
    }
  
    public async perform (userSignupRequest: UserData):
      Promise<Either<ExistingUserError | InvalidEmailError | InvalidPasswordError, AuthenticationResult>> {
      const userOrError = User.create(userSignupRequest.email, userSignupRequest.password)
      if (userOrError.isLeft()) {
        return left(userOrError.value)
      }
  
      const user = await this.userRepository.findByEmail(userSignupRequest.email)
      if (user) {
        return left(new ExistingUserError(userSignupRequest))
      }
  
      const encodedPassword = await this.encoder.encode(userSignupRequest.password)
      await this.userRepository.add({
        email: userSignupRequest.email,
        password: encodedPassword
      })
  
      const response =
        (await this.authentication.auth({
          email: userSignupRequest.email,
          password: userSignupRequest.password
        })).value as AuthenticationResult
  
      return right(response)
    }
  }