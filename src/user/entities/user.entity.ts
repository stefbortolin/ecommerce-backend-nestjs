import { Product } from "../../product/entities/product.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

export enum UserRole {
    ADMIN = "admin",
    USER = "user",
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number
    @Column({unique: true})
    username: string
    @Column()
    password: string
    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER,
    })
    role: UserRole
    @OneToMany(()=> Product, (product) => product.user)
    products: Product[]
}
