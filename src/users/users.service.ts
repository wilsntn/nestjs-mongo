import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { ObjectId } from 'bson';
const saltRounds = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;
    const hashPass = await bcrypt.hash(password, saltRounds);

    const user = this.userRepository.create({
      name,
      email,
      password: hashPass,
      isAdmin: false,
      isActive: false,
      balance: 0,
    });
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    return await this.userRepository.findOne({ _id: new ObjectId(id) } as any);
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  remove(id: string) {
    return this.userRepository.delete(id);
  }
}
