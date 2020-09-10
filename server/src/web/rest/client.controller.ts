import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Client from '../../domain/client.entity';
import { ClientService } from '../../service/client.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/clients')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('clients')
export class ClientController {
  logger = new Logger('ClientController');

  constructor(private readonly clientService: ClientService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Client
  })
  async getAll(@Req() req: Request): Promise<Client[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.clientService.findAndCount({
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
    type: Client
  })
  async getOne(@Param('id') id: string): Promise<Client> {
    return await this.clientService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create client' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Client
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() client: Client): Promise<Client> {
    const created = await this.clientService.save(client);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Client', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update client' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Client
  })
  async put(@Req() req: Request, @Body() client: Client): Promise<Client> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Client', client.id);
    return await this.clientService.update(client);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete client' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Client> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Client', id);
    const toDelete = await this.clientService.findById(id);
    return await this.clientService.delete(toDelete);
  }
}
