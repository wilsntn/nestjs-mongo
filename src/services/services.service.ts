import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service) private serviceRepository: Repository<Service>,
  ) {}
  createService(createServiceDto: CreateServiceDto) {
    const { name, price, description, minmax, service_id } = createServiceDto;
    const service = this.serviceRepository.create({
      service_id,
      name,
      price,
      description,
      minmax,
    });
    return this.serviceRepository.save(service);
  }

  findAll() {
    return this.serviceRepository.find();
  }

  findOne(service_id: string) {
    return this.serviceRepository.findOne({
      where: { service_id: service_id },
    });
  }

  remove(service_id: string) {
    return this.serviceRepository.delete({ service_id: service_id });
  }
}
