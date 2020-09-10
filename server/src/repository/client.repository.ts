import { EntityRepository, Repository } from 'typeorm';
import Client from '../domain/client.entity';

@EntityRepository(Client)
export class ClientRepository extends Repository<Client> {}
