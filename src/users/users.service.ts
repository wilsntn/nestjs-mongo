import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { hashSync, genSaltSync, saltRounds } from 'bcrypt';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  salt = genSaltSync(saltRounds);
  createUser(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;

    const user = this.userRepository.create({
      id: uuid(),
      name,
      email,
      password: hashSync(password, this.salt),
      isAdmin: false,
      isActive: false,
      balance: 0,
    });
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: string) {
    return this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  remove(id: string) {
    return this.userRepository.delete({ id: id });
  }
}
