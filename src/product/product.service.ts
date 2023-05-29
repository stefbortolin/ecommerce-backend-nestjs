import { Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { Product } from './entities/product.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorManager } from '../utils/error.manager';

@Injectable()
export class ProductService {

  constructor(@InjectRepository(Product) private productRepository: Repository<Product>) {

  }

  public async create(product: CreateProductDto): Promise<Product> {
    try {
      const newProduct = this.productRepository.create(product)
      return await this.productRepository.save(newProduct)
    } catch (error) {
      throw new ErrorManager.createSignatureError(error.message)
    }
  }
  public async findAll(): Promise<Product[]> {
    try {
      const products: Product[] = await this.productRepository.find()
      if ( products.length === 0){
        throw new ErrorManager({
          type:'BAD_REQUEST',
          message: 'No se encontro resultado'
        })
      }
      return products
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message)
    }
  }

    public async findOne(id: string): Promise<Product> {
    try {
      const product: Product = await this.productRepository.
      createQueryBuilder('product')
      .where({id})
      .leftJoinAndSelect('product.user','user')
      .leftJoinAndSelect('product.category','category')
      .getOne()
      
      if (!product){
        throw new ErrorManager({
          type:'BAD_REQUEST',
          message: 'No se encontro resultado'
        })
      }

      return product
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message)
    }
  }

  public async update(id: string, updatedProduct: UpdateProductDto): Promise<UpdateResult | undefined>  {
    try {
      const product: UpdateResult = await this.productRepository.update(id, updatedProduct)
      if (product.affected == 0 ){
        throw new ErrorManager({
          type:'BAD_REQUEST',
          message: 'No se pudo actualizar'
        })
      }
      return product
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message)
    }
  }

  public async remove(id: string): Promise<DeleteResult | undefined>  {
    try {
      const product: DeleteResult = await this.productRepository.delete(id)
      if (product.affected == 0 ){
        throw new ErrorManager({
          type:'BAD_REQUEST',
          message: 'No se pudo borrar'
        })
      }
      return product
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message)
    }
  }
}
