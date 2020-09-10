import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IBorrowedBook, BorrowedBook } from 'app/shared/model/borrowed-book.model';
import { BorrowedBookService } from './borrowed-book.service';

@Component({
  selector: 'jhi-borrowed-book-update',
  templateUrl: './borrowed-book-update.component.html'
})
export class BorrowedBookUpdateComponent implements OnInit {
  isSaving = false;
  borrowDateDp: any;

  editForm = this.fb.group({
    id: [],
    borrowDate: []
  });

  constructor(protected borrowedBookService: BorrowedBookService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ borrowedBook }) => {
      this.updateForm(borrowedBook);
    });
  }

  updateForm(borrowedBook: IBorrowedBook): void {
    this.editForm.patchValue({
      id: borrowedBook.id,
      borrowDate: borrowedBook.borrowDate
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const borrowedBook = this.createFromForm();
    if (borrowedBook.id !== undefined) {
      this.subscribeToSaveResponse(this.borrowedBookService.update(borrowedBook));
    } else {
      this.subscribeToSaveResponse(this.borrowedBookService.create(borrowedBook));
    }
  }

  private createFromForm(): IBorrowedBook {
    return {
      ...new BorrowedBook(),
      id: this.editForm.get(['id'])!.value,
      borrowDate: this.editForm.get(['borrowDate'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBorrowedBook>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
