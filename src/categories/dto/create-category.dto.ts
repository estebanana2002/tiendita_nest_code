import { MinLength, isBoolean } from "class-validator"

export class CreateCategoryDto {
    @MinLength(4)
    category: string;
    @MinLength(4)
    description: string;
    state: boolean;
}
