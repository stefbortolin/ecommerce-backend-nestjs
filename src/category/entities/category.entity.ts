import { Product } from "../../product/entities/product.entity"
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Category extends BaseEntity {
    @Column()
    name: string
    @OneToMany(()=> Product, (product) => product.category)
    products: Product[]
}
