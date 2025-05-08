import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty({ message: 'Not empty username' })
    username: string;

    @IsNotEmpty({ message: 'Not empty email' })
    email: string;

    @IsNotEmpty({ message: 'Not empty password' })
    password: string; 

}
