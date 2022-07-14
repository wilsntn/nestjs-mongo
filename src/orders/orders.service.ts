import { Injectable, ExecutionContext } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { ObjectId } from 'bson';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto, req: any) {
    const { details, link, quantity } = createOrderDto;
    const user = req.user.id;
    const order = await this.orderRepository.create({
      details,
      link,
      quantity,
      user: user,
    });
    return await this.orderRepository.save(order);
  }

  findAll(req: any) {
    const user = req.user.id;
    return this.orderRepository.find({
      where: { user: user },
      relations: { user: true },
    });
  }

  findOne(id: string) {
    return this.orderRepository.findOne({
      _id: new ObjectId(id),
    } as any);
  }

  remove(id: string) {
    return this.orderRepository.delete(id);
  }
}
