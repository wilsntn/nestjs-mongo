import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ObjectIdColumn,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Order {
  @ObjectIdColumn()
  _id: string;

  @Column()
  details: string;

  @Column({ default: 'Pendente' })
  status: string;

  @Column()
  link: string;

  @Column()
  quantity: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;
}
