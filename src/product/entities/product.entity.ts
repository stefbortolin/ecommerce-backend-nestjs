import { Category } from "../../category/entities/category.entity"
import { User } from "../..//user/entities/user.entity"
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Product extends BaseEntity{
    @Column()
    name: string
    @Column()
    price: number
    @Column()
    rating: number
    @Column()
    description: string
    @ManyToOne(()=> Category,(category) => category.products)
    category: Category
    @ManyToOne(()=> User,(user) => user.products)
    user: User
    @Column({default: 0})
    stock: number
}
