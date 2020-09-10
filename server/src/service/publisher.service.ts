import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import Publisher from '../domain/publisher.entity';
import { PublisherRepository } from '../repository/publisher.repository';

const relationshipNames = [];

@Injectable()
export class PublisherService {
  logger = new Logger('PublisherService');

  constructor(@InjectRepository(PublisherRepository) private publisherRepository: PublisherRepository) {}

  async findById(id: string): Promise<Publisher | undefined> {
    const options = { relations: relationshipNames };
    return await this.publisherRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Publisher>): Promise<Publisher | undefined> {
    return await this.publisherRepository.findOne(options);
  }

  async findAndCount(options: FindManyOptions<Publisher>): Promise<[Publisher[], number]> {
    options.relations = relationshipNames;
    return await this.publisherRepository.findAndCount(options);
  }

  async save(publisher: Publisher): Promise<Publisher | undefined> {
    return await this.publisherRepository.save(publisher);
  }

  async update(publisher: Publisher): Promise<Publisher | undefined> {
    return await this.save(publisher);
  }

  async delete(publisher: Publisher): Promise<Publisher | undefined> {
    return await this.publisherRepository.remove(publisher);
  }
}
