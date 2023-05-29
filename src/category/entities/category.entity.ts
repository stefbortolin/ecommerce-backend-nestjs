import { BaseEntity } from "../../config/base.entity"
import { Product } from "../../product/entities/product.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Category extends BaseEntity {
    @Column()
    name: string
    @OneToMany(()=> Product, (product) => product.category)
    products: Product[]
}
