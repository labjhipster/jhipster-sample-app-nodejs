import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Author from '../../domain/author.entity';
import { AuthorService } from '../../service/author.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/authors')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('authors')
export class AuthorController {
  logger = new Logger('AuthorController');

  constructor(private readonly authorService: AuthorService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Author
  })
  async getAll(@Req() req: Request): Promise<Author[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.authorService.findAndCount({
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
    type: Author
  })
  async getOne(@Param('id') id: string): Promise<Author> {
    return await this.authorService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create author' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Author
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() author: Author): Promise<Author> {
    const created = await this.authorService.save(author);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Author', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update author' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Author
  })
  async put(@Req() req: Request, @Body() author: Author): Promise<Author> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Author', author.id);
    return await this.authorService.update(author);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete author' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Author> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Author', id);
    const toDelete = await this.authorService.findById(id);
    return await this.authorService.delete(toDelete);
  }
}
