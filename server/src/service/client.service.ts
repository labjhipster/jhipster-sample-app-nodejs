import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import Client from '../domain/client.entity';
import { ClientRepository } from '../repository/client.repository';

const relationshipNames = [];

@Injectable()
export class ClientService {
  logger = new Logger('ClientService');

  constructor(@InjectRepository(ClientRepository) private clientRepository: ClientRepository) {}

  async findById(id: string): Promise<Client | undefined> {
    const options = { relations: relationshipNames };
    return await this.clientRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Client>): Promise<Client | undefined> {
    return await this.clientRepository.findOne(options);
  }

  async findAndCount(options: FindManyOptions<Client>): Promise<[Client[], number]> {
    options.relations = relationshipNames;
    return await this.clientRepository.findAndCount(options);
  }

  async save(client: Client): Promise<Client | undefined> {
    return await this.clientRepository.save(client);
  }

  async update(client: Client): Promise<Client | undefined> {
    return await this.save(client);
  }

  async delete(client: Client): Promise<Client | undefined> {
    return await this.clientRepository.remove(client);
  }
}
