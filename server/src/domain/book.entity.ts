/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { ApiModelProperty } from '@nestjs/swagger';
import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A Book.
 */
@Entity('book')
export default class Book extends BaseEntity {
  @Column({ name: 'isbn', length: 13, unique: true })
  isbn: string;

  @Column({ name: 'name', length: 100 })
  name: string;

  @Column({ name: 'publish_year', length: 50 })
  publishYear: string;

  @Column({ type: 'integer', name: 'copies' })
  copies: number;

  @Column({ type: 'blob', name: 'cover', nullable: true })
  cover: any;

  @Column({ name: 'cover_content_type', nullable: true })
  coverContentType: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
