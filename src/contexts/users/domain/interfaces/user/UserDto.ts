import { UserName } from "../../value_objects/user/UserName"
import { UserPassword } from "../../value_objects/user/UserPassword"

export interface UserDto {
  id: string
  name: UserName
  password: UserPassword
  enabled: boolean
}
