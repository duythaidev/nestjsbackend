import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsNotEmpty({ message: 'Not empty id' })
    @IsMongoId({ message: 'Not mongo id' })
    _id: string;
    username: string;
    email: string;
    password: string;
}
