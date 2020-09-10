import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IBorrowedBook } from 'app/shared/model/borrowed-book.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { BorrowedBookService } from './borrowed-book.service';
import { BorrowedBookDeleteDialogComponent } from './borrowed-book-delete-dialog.component';

@Component({
  selector: 'jhi-borrowed-book',
  templateUrl: './borrowed-book.component.html'
})
export class BorrowedBookComponent implements OnInit, OnDestroy {
  borrowedBooks?: IBorrowedBook[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    protected borrowedBookService: BorrowedBookService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadPage(page?: number): void {
    const pageToLoad: number = page || this.page;

    this.borrowedBookService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IBorrowedBook[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
        () => this.onError()
      );
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.ascending = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
      this.ngbPaginationPage = data.pagingParams.page;
      this.loadPage();
    });
    this.registerChangeInBorrowedBooks();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IBorrowedBook): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInBorrowedBooks(): void {
    this.eventSubscriber = this.eventManager.subscribe('borrowedBookListModification', () => this.loadPage());
  }

  delete(borrowedBook: IBorrowedBook): void {
    const modalRef = this.modalService.open(BorrowedBookDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.borrowedBook = borrowedBook;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IBorrowedBook[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['/borrowed-book'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
      }
    });
    this.borrowedBooks = data || [];
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }
}
