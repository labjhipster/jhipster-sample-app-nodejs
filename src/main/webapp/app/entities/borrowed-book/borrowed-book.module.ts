import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GenSharedModule } from 'app/shared/shared.module';
import { BorrowedBookComponent } from './borrowed-book.component';
import { BorrowedBookDetailComponent } from './borrowed-book-detail.component';
import { BorrowedBookUpdateComponent } from './borrowed-book-update.component';
import { BorrowedBookDeleteDialogComponent } from './borrowed-book-delete-dialog.component';
import { borrowedBookRoute } from './borrowed-book.route';

@NgModule({
  imports: [GenSharedModule, RouterModule.forChild(borrowedBookRoute)],
  declarations: [BorrowedBookComponent, BorrowedBookDetailComponent, BorrowedBookUpdateComponent, BorrowedBookDeleteDialogComponent],
  entryComponents: [BorrowedBookDeleteDialogComponent]
})
export class GenBorrowedBookModule {}
