import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Client } from '../entities/client';
import { Photo } from '../entities/photo';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  create(client: Omit<Client, 'id' | 'active' | 'createdAt' | 'updatedAt'>) {
    return this.clientRepository.save(client);
  }

  findAll(): Promise<Client[]> {
    return this.clientRepository.find();
  }

  findUserWithPassword(where: FindOptionsWhere<Client>): Promise<Client | null> {
    return this.clientRepository.findOne({ where, select: ['password', 'email', 'id', 'firstName', 'lastName'] } );
  }

  findOneBy(where: FindOptionsWhere<Client>): Promise<Client | null> {
    return this.clientRepository.findOneBy(where);
  }

  findOne(id: number): Promise<Client | null> {
    return this.clientRepository.findOne({ where: { id }, relations: ['photos'], });
  }

  async remove(id: number): Promise<void> {
    await this.clientRepository.delete(id);
  }
}
