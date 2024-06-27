import { diskStorage } from 'multer';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileValidatior } from './helpers/validation';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get('/search')
  search(@Query('termino') termino: string) {
    return this.productsService.searchProduct(termino);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productsService.remove(id);
  }

  @Patch(':id/state')
  changeState(@Param('id') id: number) {
    return this.productsService.setProductState(id);
  }

  @Get('byDate')
  searchByDate(@Query('date') date: string) {
    const fechaTrans = new Date(date);
    return this.productsService.searchByDate(fechaTrans)
  }

  @Post('/withImage/:id')
  @UseInterceptors(FileInterceptor('img', {
      storage: diskStorage({
        destination: './static/uploads',
        filename: (req, file, res) => {
          res(null, file.originalname)
        }
      }),
      fileFilter: fileValidatior
    }
  ))
  uploadImage(@UploadedFile() file: Express.Multer.File, @Param('id') id: number) {
    if ( !file ) {
      throw new BadRequestException(`No hay file:(((((`);
    }

    return this.productsService.updateImage(id, file.originalname);
  }
}
