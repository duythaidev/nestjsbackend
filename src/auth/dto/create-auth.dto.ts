import { IsNotEmpty } from "class-validator";

export class CreateAuthDto {

        @IsNotEmpty({ message: 'Not empty email' })
        email: string;
    
        @IsNotEmpty({ message: 'Not empty password' })
        password: string; 
    
}
