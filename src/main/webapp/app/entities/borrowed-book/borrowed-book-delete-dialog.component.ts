import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBorrowedBook } from 'app/shared/model/borrowed-book.model';
import { BorrowedBookService } from './borrowed-book.service';

@Component({
  templateUrl: './borrowed-book-delete-dialog.component.html'
})
export class BorrowedBookDeleteDialogComponent {
  borrowedBook?: IBorrowedBook;

  constructor(
    protected borrowedBookService: BorrowedBookService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.borrowedBookService.delete(id).subscribe(() => {
      this.eventManager.broadcast('borrowedBookListModification');
      this.activeModal.close();
    });
  }
}
