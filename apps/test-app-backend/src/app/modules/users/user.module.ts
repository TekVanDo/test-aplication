import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueriesModule } from '../queries/queries.module';
import { UsersController } from './controllers/users.controller';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SharedModule, QueriesModule, TypeOrmModule.forFeature([])],
  controllers: [UsersController],
})
export class UserModule {
}
