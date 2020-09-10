import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IBorrowedBook, BorrowedBook } from 'app/shared/model/borrowed-book.model';
import { BorrowedBookService } from './borrowed-book.service';
import { BorrowedBookComponent } from './borrowed-book.component';
import { BorrowedBookDetailComponent } from './borrowed-book-detail.component';
import { BorrowedBookUpdateComponent } from './borrowed-book-update.component';

@Injectable({ providedIn: 'root' })
export class BorrowedBookResolve implements Resolve<IBorrowedBook> {
  constructor(private service: BorrowedBookService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBorrowedBook> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((borrowedBook: HttpResponse<BorrowedBook>) => {
          if (borrowedBook.body) {
            return of(borrowedBook.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new BorrowedBook());
  }
}

export const borrowedBookRoute: Routes = [
  {
    path: '',
    component: BorrowedBookComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'BorrowedBooks'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: BorrowedBookDetailComponent,
    resolve: {
      borrowedBook: BorrowedBookResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'BorrowedBooks'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: BorrowedBookUpdateComponent,
    resolve: {
      borrowedBook: BorrowedBookResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'BorrowedBooks'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: BorrowedBookUpdateComponent,
    resolve: {
      borrowedBook: BorrowedBookResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'BorrowedBooks'
    },
    canActivate: [UserRouteAccessService]
  }
];
