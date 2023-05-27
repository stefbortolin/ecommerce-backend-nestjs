import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';


@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) {

  }

  create(category: CreateCategoryDto) {
    const newCategory = this.categoryRepository.create(category)
    return this.categoryRepository.save(newCategory)
  }

  findAll() {
    return this.categoryRepository.find()
  }

  findOne(id: number) {
    return this.categoryRepository.findOneById(id)
  }

  update(id: number, updatedCategory: UpdateCategoryDto) {
    this.categoryRepository.update({id}, updatedCategory)
  }

  remove(id: number) {
    return this.categoryRepository.delete({id})
  }
}
