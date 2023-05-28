import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { Category } from './entities/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  public async create(@Body() newCategory: CreateCategoryDto) {
    return await this.categoryService.create(newCategory);
  }

  @Get()
  public async findAll(): Promise<Category[]> {
    return await this.categoryService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<Category> {
    return await this.categoryService.findOne(id);
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string, 
    @Body() updatedCategory: UpdateCategoryDto) {
    return await this.categoryService.update(id, updatedCategory);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return await this.categoryService.remove(id);
  }
}
