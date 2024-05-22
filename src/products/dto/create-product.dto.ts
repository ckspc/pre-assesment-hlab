import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  translations: {
    language: string;
    name: string;
    description: string;
  }[];
}
