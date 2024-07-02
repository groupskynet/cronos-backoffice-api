import * as fs from 'fs'
import * as path from 'path'
import * as jwt from 'jsonwebtoken'
import { User } from "@contexts/users/domain/User"
import { Authentication } from "@contexts/users/domain/contracts/Authentication"

export class AuthenticationJwt implements Authentication{
    
    private readonly privateKey = fs.readFileSync(path.resolve(process.env.PRIVATE_KEY || ''))

    getToken(user: User): string{
        const signOptions: jwt.SignOptions = {
            algorithm: 'RS256',
            expiresIn: '1h'
          }

        return jwt.sign({id: user.id, name: user.name}, this.privateKey, signOptions)
    }
    
}