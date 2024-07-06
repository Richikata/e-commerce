import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import axios from 'axios';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}
  async create(createProductDto: Product): Promise<Product> {
    return this.productRepository.save(createProductDto);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: string): Promise<Product> {
    return this.productRepository.findOne({ where: { id } });
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
    await this.productRepository.update(id, updateProductDto);
    return this.productRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<any> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
    await this.productRepository.delete(id);
    return `Product with ID "${id}" has been removed`;
  }

  async getDummyData() {
    const response = await axios.get('https://fakestoreapi.com/products');
    const dummyData = response.data;
    for (let i = 0; i < dummyData.length; i++) {
      const product = {
        name: dummyData[i].title,
        imageUrl: dummyData[i].image,
        price: dummyData[i].price,
        description: dummyData[i].description,
        category: dummyData[i].category,
        stock: 100,
      };

      await this.productRepository.save(product);
    }

    return 'Dummy data for products created!';
  }
}
