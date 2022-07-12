import { Entity, PrimaryColumn, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class Service {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  service_id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: string;

  @Column()
  minmax: string;
}
