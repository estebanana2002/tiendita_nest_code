import { MinLength, isBoolean } from "class-validator"

export class CreateCategoryDto {
    category: string;
    @MinLength(4)
    description: string;
    state: boolean;
}
