import { Exclude } from "class-transformer"
import { BaseEntity } from "../../config/base.entity"
import { UserRole } from "../../constants/roles"
import { Product } from "../../product/entities/product.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User extends BaseEntity{
    @Column({unique: true})
    username: string

    @Exclude()
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
