import { IsHexColor, IsString } from "class-validator";
import { Category } from "../entities/category.entity";

export class CreateCategoryDto extends Category {
    @IsString()
    title: string;
    @IsHexColor()
    color: string;
}
