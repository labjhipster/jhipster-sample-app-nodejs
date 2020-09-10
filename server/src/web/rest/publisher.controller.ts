import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Publisher from '../../domain/publisher.entity';
import { PublisherService } from '../../service/publisher.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/publishers')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('publishers')
export class PublisherController {
  logger = new Logger('PublisherController');

  constructor(private readonly publisherService: PublisherService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Publisher
  })
  async getAll(@Req() req: Request): Promise<Publisher[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.publisherService.findAndCount({
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
    type: Publisher
  })
  async getOne(@Param('id') id: string): Promise<Publisher> {
    return await this.publisherService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create publisher' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Publisher
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() publisher: Publisher): Promise<Publisher> {
    const created = await this.publisherService.save(publisher);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Publisher', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update publisher' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Publisher
  })
  async put(@Req() req: Request, @Body() publisher: Publisher): Promise<Publisher> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Publisher', publisher.id);
    return await this.publisherService.update(publisher);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete publisher' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Publisher> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Publisher', id);
    const toDelete = await this.publisherService.findById(id);
    return await this.publisherService.delete(toDelete);
  }
}
