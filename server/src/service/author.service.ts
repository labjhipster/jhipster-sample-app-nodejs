import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import Author from '../domain/author.entity';
import { AuthorRepository } from '../repository/author.repository';

const relationshipNames = [];

@Injectable()
export class AuthorService {
  logger = new Logger('AuthorService');

  constructor(@InjectRepository(AuthorRepository) private authorRepository: AuthorRepository) {}

  async findById(id: string): Promise<Author | undefined> {
    const options = { relations: relationshipNames };
    return await this.authorRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Author>): Promise<Author | undefined> {
    return await this.authorRepository.findOne(options);
  }

  async findAndCount(options: FindManyOptions<Author>): Promise<[Author[], number]> {
    options.relations = relationshipNames;
    return await this.authorRepository.findAndCount(options);
  }

  async save(author: Author): Promise<Author | undefined> {
    return await this.authorRepository.save(author);
  }

  async update(author: Author): Promise<Author | undefined> {
    return await this.save(author);
  }

  async delete(author: Author): Promise<Author | undefined> {
    return await this.authorRepository.remove(author);
  }
}
