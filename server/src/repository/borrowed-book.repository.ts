import { EntityRepository, Repository } from 'typeorm';
import BorrowedBook from '../domain/borrowed-book.entity';

@EntityRepository(BorrowedBook)
export class BorrowedBookRepository extends Repository<BorrowedBook> {}
