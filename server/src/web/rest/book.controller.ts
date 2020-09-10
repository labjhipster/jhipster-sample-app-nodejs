import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Book from '../../domain/book.entity';
import { BookService } from '../../service/book.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/books')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('books')
export class BookController {
  logger = new Logger('BookController');

  constructor(private readonly bookService: BookService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Book
  })
  async getAll(@Req() req: Request): Promise<Book[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.bookService.findAndCount({
      skip: +pageRequest.page * pageRequest.size,
      take: +pageRequest.size,
      order: pageRequest.sort.asOrder()
    });
    HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
    return results;
  }

  @Get('/:id')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Book
  })
  async getOne(@Param('id') id: string): Promise<Book> {
    return await this.bookService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create book' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Book
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() book: Book): Promise<Book> {
    const created = await this.bookService.save(book);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Book', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update book' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Book
  })
  async put(@Req() req: Request, @Body() book: Book): Promise<Book> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Book', book.id);
    return await this.bookService.update(book);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete book' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Book> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Book', id);
    const toDelete = await this.bookService.findById(id);
    return await this.bookService.delete(toDelete);
  }
}
