import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ObjectIdColumn,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { ObjectId } from 'bson';

@Entity()
export class Order {
  @ObjectIdColumn()
  id: ObjectId;

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
