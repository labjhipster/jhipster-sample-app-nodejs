import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import BorrowedBook from '../src/domain/borrowed-book.entity';
import { BorrowedBookService } from '../src/service/borrowed-book.service';

describe('BorrowedBook Controller', () => {
  let app: INestApplication;

  const authGuardMock = { canActivate: (): any => true };
  const rolesGuardMock = { canActivate: (): any => true };
  const entityMock: any = {
    id: 'entityId'
  };

  const serviceMock = {
    findById: (): any => entityMock,
    findAndCount: (): any => [entityMock, 0],
    save: (): any => entityMock,
    update: (): any => entityMock,
    delete: (): any => entityMock
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .overrideGuard(RolesGuard)
      .useValue(rolesGuardMock)
      .overrideProvider(BorrowedBookService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all borrowed-books ', async () => {
    const getEntities: BorrowedBook[] = (
      await request(app.getHttpServer())
        .get('/api/borrowed-books')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET borrowed-books by id', async () => {
    const getEntity: BorrowedBook = (
      await request(app.getHttpServer())
        .get('/api/borrowed-books/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create borrowed-books', async () => {
    const createdEntity: BorrowedBook = (
      await request(app.getHttpServer())
        .post('/api/borrowed-books')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update borrowed-books', async () => {
    const updatedEntity: BorrowedBook = (
      await request(app.getHttpServer())
        .put('/api/borrowed-books')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE borrowed-books', async () => {
    const deletedEntity: BorrowedBook = (
      await request(app.getHttpServer())
        .delete('/api/borrowed-books/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
