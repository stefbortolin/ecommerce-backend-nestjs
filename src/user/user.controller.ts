import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { PublicAccess } from '../auth/decorators/public.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public async create(@Body() newUser: CreateUserDto) {
    return await this.userService.create(newUser);
  }

  @Get()
  public async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @PublicAccess()
  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<User> {
    return await this.userService.findOne(id);
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string, 
    @Body() updatedUser: UpdateUserDto) {
    return await this.userService.update(id, updatedUser);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string) {
    return await this.userService.remove(id);
  }
}
