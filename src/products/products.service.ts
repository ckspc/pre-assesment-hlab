import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductTranslation } from './product-translation.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductTranslation)
    private readonly productTranslationRepository: Repository<ProductTranslation>,
  ) {}

  async findAll({
    page,
    limit,
  }: {
    page: number;
    limit: number;
  }): Promise<{ data: Product[]; total: number }> {
    const [data, total] = await this.productRepository.findAndCount({
      relations: ['translations'],
      take: limit,
      skip: (page - 1) * limit,
    });
    return { data, total };
  }

  async findByName({
    name,
    page,
    limit,
  }: {
    name: string;
    page: number;
    limit: number;
  }): Promise<{ data: ProductTranslation[]; total: number }> {
    const [data, total] = await this.productTranslationRepository.findAndCount({
      where: {
        name: Like(`%${name}%`),
      },
      relations: ['product'],
      take: limit,
      skip: (page - 1) * limit,
    });

    if (data && data.length !== 0) {
      const productIds = data.map((product) => product.product.id);
      const productTranslations = await this.productTranslationRepository.find({
        where: {
          product: In(productIds),
        },
        relations: ['product'],
      });

      return { data: productTranslations, total };
    } else {
      return { data: [], total: 0 };
    }
  }

  async createProduct(createProductDto: CreateProductDto): Promise<void> {
    const { translations } = createProductDto;

    const product = new Product();
    product.translations = [];

    for (const translation of translations) {
      const productTranslation = new ProductTranslation();
      productTranslation.language = translation.language;
      productTranslation.name = translation.name;
      productTranslation.description = translation.description;

      product.translations.push(productTranslation);
    }

    await this.productRepository.save(product);
  }
}
