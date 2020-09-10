import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowedBookController } from '../web/rest/borrowed-book.controller';
import { BorrowedBookRepository } from '../repository/borrowed-book.repository';
import { BorrowedBookService } from '../service/borrowed-book.service';

@Module({
  imports: [TypeOrmModule.forFeature([BorrowedBookRepository])],
  controllers: [BorrowedBookController],
  providers: [BorrowedBookService],
  exports: [BorrowedBookService]
})
export class BorrowedBookModule {}
