import { Injectable, ExecutionContext } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';

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

  findAll() {
    return this.orderRepository.find({ relations: ['user'] });
  }

  findOne(id: string) {
    return `This action returns a #${id} order`;
  }

  remove(id: string) {
    return `This action removes a #${id} order`;
  }
}
