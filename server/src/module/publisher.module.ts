import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublisherController } from '../web/rest/publisher.controller';
import { PublisherRepository } from '../repository/publisher.repository';
import { PublisherService } from '../service/publisher.service';

@Module({
  imports: [TypeOrmModule.forFeature([PublisherRepository])],
  controllers: [PublisherController],
  providers: [PublisherService],
  exports: [PublisherService]
})
export class PublisherModule {}
