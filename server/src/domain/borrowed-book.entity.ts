/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { ApiModelProperty } from '@nestjs/swagger';

/**
 * A BorrowedBook.
 */
@Entity('borrowed_book')
export default class BorrowedBook extends BaseEntity {
  @Column({ type: 'date', name: 'borrow_date', nullable: true })
  borrowDate: any;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
