import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'spp',
  password: 'spp',
  database: 'ecommerce',
  entities: [Product, User],
  schema: 'public',
  synchronize: true,
  logging: true,
};

export default config;
