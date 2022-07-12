import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { ServicesModule } from './services/services.module';
import { Service } from './services/entities/service.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost:27017/graphql-mongo',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [User, Service],
    }),
    UsersModule,
    ServicesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
