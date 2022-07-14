import {
  Entity,
  Column,
  ObjectIdColumn,
  OneToMany,
  ObjectID as ObjectIDType,
} from 'typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { ObjectId } from 'bson';

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ default: false })
  isActive: boolean;

  @Column()
  balance: 0;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
