import { Moment } from 'moment';

export interface IBorrowedBook {
  id?: number;
  borrowDate?: Moment;
}

export class BorrowedBook implements IBorrowedBook {
  constructor(public id?: number, public borrowDate?: Moment) {}
}
