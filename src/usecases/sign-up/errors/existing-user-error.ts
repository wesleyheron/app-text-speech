import { UserData } from "../../ports"

export class ExistingUserError extends Error {
    public readonly name = 'ExistingUserError'
    constructor (userData: UserData) {
      super('User ' + userData.email + ' already registered.')
    }
  }