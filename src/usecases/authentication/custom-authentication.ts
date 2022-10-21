/*import { Either, left, right } from "../../shared/either"
import { Encoder, UserRepository } from "../ports/index"
import { TokenManager } from "./ports/token-manager"
import { UserNotFoundError, WrongPasswordError } from "./errors/index"
import { AuthenticationParams, AuthenticationResult, AuthenticationService } from '../authentication/ports/index'

export class CustomAuthentication implements AuthenticationService {
    private readonly userRepository: UserRepository
    private readonly encoder: Encoder
    private readonly tokenManager: TokenManager
  
    constructor
    (userRepository: UserRepository, encoder: Encoder, tokenManager: TokenManager) {
      this.userRepository = userRepository
      this.encoder = encoder
      this.tokenManager = tokenManager
    }
  
    async auth (authenticationParams: AuthenticationParams):
      Promise<Either<UserNotFoundError | WrongPasswordError, AuthenticationResult>> {
      const user = await this.userRepository.findByEmail(authenticationParams.email)
      if (!user) {
        return left(new UserNotFoundError())
      }
  
      const matches =
        await this.encoder.compare(authenticationParams.password, user.password)
        
      if (!matches) {
        return left(new WrongPasswordError())
      }
  
      const accessToken = await this.tokenManager.sign({ id: user.id })
  
      return right({
        accessToken: accessToken,
        id: user.id
      })
    }
  }*/