import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientService } from './services/client.service';
import { User } from './entities/user';
import { Client } from './entities/client';
import { Photo } from './entities/photo';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Client, Photo])
  ],
  providers: [
    ClientService
  ],
  exports: [
    ClientService
  ],
})
export class QueriesModule {
}
