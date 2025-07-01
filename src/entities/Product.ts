import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import 'reflect-metadata';

@Entity()
export class Product {

  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column("decimal")
  price!: number

  @Column('text')
  description!: string

}
