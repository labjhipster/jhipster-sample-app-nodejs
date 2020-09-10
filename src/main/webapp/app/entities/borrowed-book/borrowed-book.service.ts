import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IBorrowedBook } from 'app/shared/model/borrowed-book.model';

type EntityResponseType = HttpResponse<IBorrowedBook>;
type EntityArrayResponseType = HttpResponse<IBorrowedBook[]>;

@Injectable({ providedIn: 'root' })
export class BorrowedBookService {
  public resourceUrl = SERVER_API_URL + 'api/borrowed-books';

  constructor(protected http: HttpClient) {}

  create(borrowedBook: IBorrowedBook): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(borrowedBook);
    return this.http
      .post<IBorrowedBook>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(borrowedBook: IBorrowedBook): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(borrowedBook);
    return this.http
      .put<IBorrowedBook>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IBorrowedBook>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IBorrowedBook[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(borrowedBook: IBorrowedBook): IBorrowedBook {
    const copy: IBorrowedBook = Object.assign({}, borrowedBook, {
      borrowDate: borrowedBook.borrowDate && borrowedBook.borrowDate.isValid() ? borrowedBook.borrowDate.format(DATE_FORMAT) : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.borrowDate = res.body.borrowDate ? moment(res.body.borrowDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((borrowedBook: IBorrowedBook) => {
        borrowedBook.borrowDate = borrowedBook.borrowDate ? moment(borrowedBook.borrowDate) : undefined;
      });
    }
    return res;
  }
}
