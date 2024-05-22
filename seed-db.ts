import { createConnection } from 'typeorm';
import { Product } from './src/products/product.entity';
import { ProductTranslation } from './src/products/product-translation.entity';

async function seedDatabase() {
  const connection = await createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'mydb',
    entities: [Product, ProductTranslation],
    synchronize: true,
  });

  const productRepository = connection.getRepository(Product);
  const productTranslationRepository =
    connection.getRepository(ProductTranslation);

  for (let i = 1; i <= 20; i++) {
    const product = new Product();
    await productRepository.save(product);

    const translationEn = new ProductTranslation();
    translationEn.product = product;
    translationEn.language = 'en';
    translationEn.name = `Product ${i}`;
    translationEn.description = `Description for Product ${i} in English`;
    await productTranslationRepository.save(translationEn);

    const translationFr = new ProductTranslation();
    translationFr.product = product;
    translationFr.language = 'fr';
    translationFr.name = `Produit ${i}`;
    translationFr.description = `Description pour Produit ${i} en Français`;
    await productTranslationRepository.save(translationFr);
  }

  await connection.close();
}

seedDatabase().then(() => console.log('Seed data inserted successfully'));
