import { Injectable } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ErrorManager } from '../utils/error.manager';


@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) {

  }

  public async create(category: CreateCategoryDto): Promise<Category> {
    try {
      const newCategory = this.categoryRepository.create(category)
      return await this.categoryRepository.save(newCategory)
    } catch (error) {
      throw new ErrorManager.createSignatureError(error.message)
    }

  }

  public async findAll(): Promise<Category[]> {
    try {
      const categories: Category[] = await this.categoryRepository.find()
      if ( categories.length === 0){
        throw new ErrorManager({
          type:'BAD_REQUEST',
          message: 'No se encontro resultado'
        })
      }
      return categories
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message)
    }

  }

  public async findOne(id: string): Promise<Category> {
    try {
      const category: Category = await this.categoryRepository.
      createQueryBuilder('category')
      .where({id})
      .getOne()
      
      if (!category){
        throw new ErrorManager({
          type:'BAD_REQUEST',
          message: 'No se encontro resultado'
        })
      }

      return category
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message)
    }
  }

  public async update(id: string, updatedCategory: UpdateCategoryDto): Promise<UpdateResult | undefined>  {
    try {
      const user: UpdateResult = await this.categoryRepository.update(id, updatedCategory)
      if (user.affected == 0 ){
        throw new ErrorManager({
          type:'BAD_REQUEST',
          message: 'No se pudo actualizar'
        })
      }
      return user
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message)
    }
  }

  public async remove(id: string): Promise<DeleteResult | undefined>  {
    try {
      const user: DeleteResult = await this.categoryRepository.delete(id)
      if (user.affected == 0 ){
        throw new ErrorManager({
          type:'BAD_REQUEST',
          message: 'No se pudo borrar'
        })
      }
      return user
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message)
    }
  }
}
