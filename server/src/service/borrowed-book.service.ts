import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import BorrowedBook from '../domain/borrowed-book.entity';
import { BorrowedBookRepository } from '../repository/borrowed-book.repository';

const relationshipNames = [];

@Injectable()
export class BorrowedBookService {
  logger = new Logger('BorrowedBookService');

  constructor(@InjectRepository(BorrowedBookRepository) private borrowedBookRepository: BorrowedBookRepository) {}

  async findById(id: string): Promise<BorrowedBook | undefined> {
    const options = { relations: relationshipNames };
    return await this.borrowedBookRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<BorrowedBook>): Promise<BorrowedBook | undefined> {
    return await this.borrowedBookRepository.findOne(options);
  }

  async findAndCount(options: FindManyOptions<BorrowedBook>): Promise<[BorrowedBook[], number]> {
    options.relations = relationshipNames;
    return await this.borrowedBookRepository.findAndCount(options);
  }

  async save(borrowedBook: BorrowedBook): Promise<BorrowedBook | undefined> {
    return await this.borrowedBookRepository.save(borrowedBook);
  }

  async update(borrowedBook: BorrowedBook): Promise<BorrowedBook | undefined> {
    return await this.save(borrowedBook);
  }

  async delete(borrowedBook: BorrowedBook): Promise<BorrowedBook | undefined> {
    return await this.borrowedBookRepository.remove(borrowedBook);
  }
}
