import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  BeforeInsert
} from 'typeorm';
import { CommerceTypeORMEntity } from '../../../commerce';
import { v4 as uuidv4 } from 'uuid';
import { ProspectType } from '../../../../core';

@Entity('ticketProspectFee')
export class TicketProspectFeeTypeORMEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 50 })
  name!: ProspectType;

  @Column()
  fee!: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creationDate?: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedOn?: Date;

  @ManyToOne(
    () => CommerceTypeORMEntity,
    (commerce) => commerce.ticketsProspectFee,
    {
      eager: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  )
  commerce!: CommerceTypeORMEntity;

  @BeforeInsert()
  async generateUUID() {
    this.id = uuidv4();
  }
}
