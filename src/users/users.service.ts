import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { ObjectId } from 'bson';
import { ConfigService } from '@nestjs/config';
import * as sendgrid from '@sendgrid/mail';
import { JwtService } from '@nestjs/jwt';

const saltRounds = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;
    const hashPass = await bcrypt.hash(password, saltRounds);

    const randomNumber = Math.floor(100000 + Math.random() * 900000);

    const code = randomNumber.toString();

    const msg = {
      to: `${email}`,
      from: 'noreply@myclubads.com',
      subject: 'Verificacao de E-mail Myclubsocial',
      text: 'Validação de E-mail',
      html: `Clique no link para ativar a sua conta! <a href="http://localhost:3100/ativar/${randomNumber}" target="_blank" rel="noopener noreferrer">Aqui!</a>`,
    };
    sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
    sendgrid
      .send(msg)
      .then(() => {
        console.log('email enviado');
      })
      .catch((err) => console.log(err));
    const user: User = this.userRepository.create({
      name,
      email,
      password: hashPass,
      isAdmin: false,
      isActive: false,
      balance: 0,
      activationCode: code,
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

  async activateEmail(cod: string) {
    await this.userRepository
      .findOneOrFail({
        where: {
          activationCode: cod,
        },
      })
      .then((userfound) => {
        userfound.isActive = true;
        return this.userRepository.save(userfound);
      })
      .catch((err) => {
        console.log(err);
      });
    return await this.userRepository.findOneOrFail({
      where: {
        activationCode: cod,
      },
    });
  }

  remove(id: string) {
    return this.userRepository.delete(id);
  }
}
