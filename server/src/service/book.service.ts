import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import Book from '../domain/book.entity';
import { BookRepository } from '../repository/book.repository';

const relationshipNames = [];

@Injectable()
export class BookService {
  logger = new Logger('BookService');

  constructor(@InjectRepository(BookRepository) private bookRepository: BookRepository) {}

  async findById(id: string): Promise<Book | undefined> {
    const options = { relations: relationshipNames };
    return await this.bookRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Book>): Promise<Book | undefined> {
    return await this.bookRepository.findOne(options);
  }

  async findAndCount(options: FindManyOptions<Book>): Promise<[Book[], number]> {
    options.relations = relationshipNames;
    return await this.bookRepository.findAndCount(options);
  }

  async save(book: Book): Promise<Book | undefined> {
    return await this.bookRepository.save(book);
  }

  async update(book: Book): Promise<Book | undefined> {
    return await this.save(book);
  }

  async delete(book: Book): Promise<Book | undefined> {
    return await this.bookRepository.remove(book);
  }
}
