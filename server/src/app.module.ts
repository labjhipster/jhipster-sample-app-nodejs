import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './module/auth.module';
import { ormconfig } from './orm.config';
import { PublisherModule } from './module/publisher.module';
import { AuthorModule } from './module/author.module';
import { ClientModule } from './module/client.module';
import { BookModule } from './module/book.module';
import { BorrowedBookModule } from './module/borrowed-book.module';
// jhipster-needle-add-entity-module-to-main-import - JHipster will import entity modules here, do not remove
// jhipster-needle-add-controller-module-to-main-import - JHipster will import controller modules here, do not remove
// jhipster-needle-add-service-module-to-main-import - JHipster will import service modules here, do not remove

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    AuthModule,
    PublisherModule,
    AuthorModule,
    ClientModule,
    BookModule,
    BorrowedBookModule,
    PublisherModule,
    AuthorModule,
    ClientModule,
    BookModule,
    BorrowedBookModule
    // jhipster-needle-add-entity-module-to-main - JHipster will add entity modules here, do not remove
  ],
  controllers: [
    // jhipster-needle-add-controller-module-to-main - JHipster will add controller modules here, do not remove
  ],
  providers: [
    // jhipster-needle-add-service-module-to-main - JHipster will add service modules here, do not remove
  ]
})
export class AppModule {}
