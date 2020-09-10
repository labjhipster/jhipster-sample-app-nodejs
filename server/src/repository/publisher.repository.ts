import { EntityRepository, Repository } from 'typeorm';
import Publisher from '../domain/publisher.entity';

@EntityRepository(Publisher)
export class PublisherRepository extends Repository<Publisher> {}
