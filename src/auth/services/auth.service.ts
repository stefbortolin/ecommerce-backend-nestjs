import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from '../../user/entities/user.entity';
import { PayloadToken } from '../interfaces/auth.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService
    ){}
    public async validateUser(username: string, password: string){
        const userByUsername = await this.userService.findBy({
            key: 'username',
            value: username
        })

        if(userByUsername){
            const match = await bcrypt.compare(password, userByUsername.password)
            if(match) return userByUsername
        }
        return null
    }

    public signJWT({payload, secret, expires}:{payload: jwt.JwtPayload; secret: string; expires: number | string}){
        return jwt.sign(payload, secret, {expiresIn: expires})
    }

    public async generateJWT(user: User): Promise<any> {
        const getUser = await this.userService.findOne(user.id)

        const payload: PayloadToken = {
            role: getUser.role,
            sub: getUser.id
        }

        return {
            accessToken:this.signJWT({
                payload,
                secret: process.env.JWT_SECRET,
                expires: '1h'
            }),
            user,
        }
    }
}
