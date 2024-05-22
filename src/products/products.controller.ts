import {
  Controller,
  Get,
  Query,
  ParseIntPipe,
  Post,
  Body,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductTranslation } from './product-translation.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ): Promise<{ data: Product[]; total: number }> {
    const { data, total } = await this.productsService.findAll({
      page,
      limit,
    });
    return { data, total };
  }

  @Get('search')
  async findByName(
    @Query('name') name: string,
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ): Promise<{ data: ProductTranslation[]; total: number }> {
    const { data, total } = await this.productsService.findByName({
      name,
      page,
      limit,
    });

    if (!data || data.length === 0) {
      throw new NotFoundException('Product not found.');
    }

    return { data, total };
  }

  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<{ message: string }> {
    try {
      await this.productsService.createProduct(createProductDto);
      return { message: 'Product created successfully.' };
    } catch (error) {
      throw new HttpException(
        'Failed to create product.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
