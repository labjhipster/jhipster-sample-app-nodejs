/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { ApiModelProperty } from '@nestjs/swagger';
import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A Publisher.
 */
@Entity('publisher')
export default class Publisher extends BaseEntity {
  @Column({ name: 'name', length: 100, unique: true })
  name: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
