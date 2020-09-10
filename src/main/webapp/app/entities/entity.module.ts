import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'publisher',
        loadChildren: () => import('./publisher/publisher.module').then(m => m.GenPublisherModule)
      },
      {
        path: 'author',
        loadChildren: () => import('./author/author.module').then(m => m.GenAuthorModule)
      },
      {
        path: 'client',
        loadChildren: () => import('./client/client.module').then(m => m.GenClientModule)
      },
      {
        path: 'book',
        loadChildren: () => import('./book/book.module').then(m => m.GenBookModule)
      },
      {
        path: 'borrowed-book',
        loadChildren: () => import('./borrowed-book/borrowed-book.module').then(m => m.GenBorrowedBookModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class GenEntityModule {}
