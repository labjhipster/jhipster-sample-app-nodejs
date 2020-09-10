import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import BorrowedBook from '../../domain/borrowed-book.entity';
import { BorrowedBookService } from '../../service/borrowed-book.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/borrowed-books')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('borrowed-books')
export class BorrowedBookController {
  logger = new Logger('BorrowedBookController');

  constructor(private readonly borrowedBookService: BorrowedBookService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: BorrowedBook
  })
  async getAll(@Req() req: Request): Promise<BorrowedBook[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.borrowedBookService.findAndCount({
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
    type: BorrowedBook
  })
  async getOne(@Param('id') id: string): Promise<BorrowedBook> {
    return await this.borrowedBookService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create borrowedBook' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: BorrowedBook
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() borrowedBook: BorrowedBook): Promise<BorrowedBook> {
    const created = await this.borrowedBookService.save(borrowedBook);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'BorrowedBook', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update borrowedBook' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: BorrowedBook
  })
  async put(@Req() req: Request, @Body() borrowedBook: BorrowedBook): Promise<BorrowedBook> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'BorrowedBook', borrowedBook.id);
    return await this.borrowedBookService.update(borrowedBook);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete borrowedBook' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<BorrowedBook> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'BorrowedBook', id);
    const toDelete = await this.borrowedBookService.findById(id);
    return await this.borrowedBookService.delete(toDelete);
  }
}
