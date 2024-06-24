import { IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @MinLength(4)
    @IsString()
    name: string;

    @MinLength(12)
    @IsString()
    last_name: string;
    
    @MinLength(12)
    @IsString()
    email: string;

    @MinLength(4)
    @IsString()
    uid: string;

    @MinLength(5)
    @IsString()
    password: string;
}
