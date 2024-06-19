import { 
  Injectable, 
  InternalServerErrorException, 
  NotFoundException
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { LessThan, Like, Repository } from 'typeorm';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product) private prodRepo: Repository<Product>
  ) {}
  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.prodRepo.create(createProductDto);
      await this.prodRepo.save(product);
      return product;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      const products = await this.prodRepo.find();
      return products;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    try {
      const product = await this.prodRepo.findOne({
        where: {
          id: id
        }
      });
      if (!product) {
        throw new NotFoundException('Product not found!');
      }
      return product;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * 
   * @param termino
   * 
   * * % termino $ indica que el termino puede estar colocado tanto a 
   * * la derecha o izquierda en el product_name
   */
  async searchProduct(termino: string) {
    const found = await this.prodRepo.find({
      where: {product_name: Like(`%${termino}%`)}
    });
    return found;
  }

  /**
   * 
   * @param id
   * @param updateProductDto
   * ? El preload es como el findOneAndUpdate, hace el getbyid y 
   * ? el update al mismo tiempo, pero no lo guarda en la bd.
   * 
   */
  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.prodRepo.preload({
        id,
        ... updateProductDto
      });
      await this.prodRepo.save(product);
      return product;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number) {
    try {
      const product = await this.prodRepo.findOne({where: {id: id}});
      if (!product) {
        throw new NotFoundException('Product not found!');
      }
      await this.prodRepo.delete(id);
      return {message: 'Se borró correctamente el producto!'}
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async setProductState(id: number) {
    try {
      const product = await this.prodRepo.findOne({
        where:{id}
      });
      const updatedProd = await this.prodRepo.preload({
        id,
        is_active: !product.is_active
      });
      this.prodRepo.save(updatedProd);
      return updatedProd;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async searchByDate(date: Date) {
    return this.prodRepo.find({
      where: {
        created_at: LessThan(date),
      }
    });
  }
}
