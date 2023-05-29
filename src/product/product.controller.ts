import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { Product } from './entities/product.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  public async create(@Body() newProduct: CreateProductDto) {
    return await this.productService.create(newProduct);
  }

  @Get()
  public async findAll(): Promise<Product[]> {
    return await this.productService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<Product> {
    return await this.productService.findOne(id);
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string, 
    @Body() updatedProduct: UpdateProductDto) {
    return await this.productService.update(id, updatedProduct);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return await this.productService.remove(id);
  }
}
