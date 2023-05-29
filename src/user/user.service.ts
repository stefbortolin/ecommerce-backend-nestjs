import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorManager } from '../utils/error.manager';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private userRepository: Repository<User>) {

  }
  public async create(user: CreateUserDto): Promise<User> {
    try {
      const newUser = this.userRepository.create(user)
      return await this.userRepository.save(newUser)
    } catch (error) {
      throw new ErrorManager.createSignatureError(error.message)
    }
  }

  public async findAll(): Promise<User[]> {
    try {
      const users: User[] = await this.userRepository.find()
      if ( users.length === 0){
        throw new ErrorManager({
          type:'BAD_REQUEST',
          message: 'No se encontro resultado'
        })
      }
      return users
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message)
    }
  }

    public async findOne(id: string): Promise<User> {
    try {
      const user: User = await this.userRepository.
      createQueryBuilder('user')
      .where({id})
      .leftJoinAndSelect('user.products','products')
      .getOne()
      
      if (!user){
        throw new ErrorManager({
          type:'BAD_REQUEST',
          message: 'No se encontro resultado'
        })
      }

      return user
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message)
    }
  }

  public async update(id: string, updatedUser: UpdateUserDto): Promise<UpdateResult | undefined>  {
    try {
      const user: UpdateResult = await this.userRepository.update(id, updatedUser)
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
      const user: DeleteResult = await this.userRepository.delete(id)
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

