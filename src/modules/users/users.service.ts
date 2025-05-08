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

    const users = await this.UserModel.find({})
      .limit(limit)
      .skip(skip)
    // .select('-_id')

    return users;
  }


  async findOne(id: number) {
    const user = await this.UserModel.findOne({ _id: id })
    return { ...user };
  }

  async update(updateUserDto: UpdateUserDto) {
    const updatedUser = await this.UserModel.findOneAndUpdate({ _id: updateUserDto._id }, updateUserDto)
    return updatedUser;
  }

  async remove(_id: number) {
    const res = await this.UserModel.deleteOne({ _id })
    return res;
  }
}
