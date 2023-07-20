import { IsString } from "class-validator";
import { User } from "../entities/user.entity";

export class ListUserDto extends User {
    
    @IsString()
    username: string;
}