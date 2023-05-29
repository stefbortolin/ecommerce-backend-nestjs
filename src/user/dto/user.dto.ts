import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { UserRole } from "../../constants/roles"


export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    username: string
    @IsNotEmpty()
    @IsString()
    password: string
    @IsOptional()
    @IsEnum(UserRole)
    role: UserRole
}

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    username: string

    @IsOptional()
    @IsString()
    password: string

    @IsOptional()
    @IsEnum(UserRole)
    role: UserRole

}