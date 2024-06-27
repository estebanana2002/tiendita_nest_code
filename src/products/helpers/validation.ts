import { BadRequestException } from "@nestjs/common";
import { Request } from "express";

export const fileValidatior = (req: Request, file: Express.Multer.File, res: Function) => {
    if ( !file ) {
        return res(new BadRequestException(`Image can't be empty!`), false);
    }
    const validTypes = [
        'jpg',
        'jpeg',
        'png',
    ];
    const validateExtension = file.mimetype.split('/')[1];
    if ( validTypes.includes(validateExtension) ) {
        return res(null, true);
    }
    return res(new BadRequestException(`Que es eso we!`), false);

}