import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepository: Repository<Category>
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = this.categoryRepository.create(createCategoryDto);
      await this.categoryRepository.save(category);
      return category;
    } catch (error) {
      throw new error(error);
    }
  }

  async findAll() {
    try {
      return await this.categoryRepository.find()
    } catch (error) {
      throw new error(error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.categoryRepository.findOne({
        where: {
          id: id
        }
      });
    } catch (error) {
      throw new error(error);
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.categoryRepository.preload({
        id,
        ... updateCategoryDto
      });
      await this.categoryRepository.save(category);
      return category;
    } catch (error) {
      throw new error(error);
    }
    
  }

  async remove(id: number) {
    try {
      const category = this.categoryRepository.findOne({
        where: {id}
      });
      if (!category) {
        throw new NotFoundException('Not found category!');
      }
      await this.categoryRepository.delete(id);
      return {message: 'Se borró correctamente la categoria!'};
    } catch (error) {
      throw new error(error);
    }
  }
}
