import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'name',
  })
  name: string;

  @Column({
    name: 'image_url',
  })
  imageUrl: string;

  @Column({
    name: 'description',
  })
  description: string;

  @Column({
    name: 'category',
  })
  category: string;

  @Column({
    name: 'price',
  })
  price: string;

  @Column({
    name: 'stock',
  })
  stock: number;

  @Column({
    name: 'is_sold_out',
    default: false,
  })
  isSoldOut: boolean;

  @Column({
    name: 'sold_count',
    default: 0,
  })
  soldCount: number;
}
