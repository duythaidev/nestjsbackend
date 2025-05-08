import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private UserModel: Model<User>) { }

  async create(createUserDto: CreateUserDto) {
    const createdUser = await this.UserModel.create(
      { ...createUserDto }
    );
    return {
      _id: createdUser._id
    };
  }


  async findAll(page: number, limit: number) {

    const skip = (page - 1) * limit

    const users = await this.UserModel.find({}).select('-_id')
      .limit(limit)
      .skip(skip)

    return users;
  }


  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
