/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { ApiModelProperty } from '@nestjs/swagger';
import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A Client.
 */
@Entity('client')
export default class Client extends BaseEntity {
  @Column({ name: 'first_name', length: 50 })
  firstName: string;

  @Column({ name: 'last_name', length: 50 })
  lastName: string;

  @Column({ name: 'email', length: 50, nullable: true, unique: true })
  email: string;

  @Column({ name: 'address', length: 50, nullable: true })
  address: string;

  @Column({ name: 'phone', length: 20, nullable: true })
  phone: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
