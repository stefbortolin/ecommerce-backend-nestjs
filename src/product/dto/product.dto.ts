import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator"
import { Category } from "../../category/entities/category.entity"
import { User } from "../../user/entities/user.entity"

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsNumber()
    price: number

    @IsNotEmpty()
    @IsNumber()
    rating: number

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsUUID()
    category: Category

    @IsNotEmpty()
    @IsUUID()
    user: User

    @IsOptional()
    @IsNumber()
    stock: number
}


export class UpdateProductDto {
    @IsOptional()
    @IsString()
    name: string

    @IsOptional()
    @IsNumber()
    price: number

    @IsOptional()
    @IsNumber()
    rating: number

    @IsOptional()
    @IsString()
    description: string

    @IsOptional()
    @IsUUID()
    category: Category

    @IsOptional()
    @IsUUID()
    user: User

    @IsOptional()
    @IsNumber()
    stock: number
}
