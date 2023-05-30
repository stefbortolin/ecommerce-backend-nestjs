import { UserRole } from "../../constants/roles"

export interface PayloadToken {
    sub: string
    role: UserRole
}

export interface AuthBody {
    username: string
    password: string
}