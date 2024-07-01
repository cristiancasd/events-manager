import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  BeforeInsert
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { UserCommerceTypeORMEntity } from '../../../user/infrastructure/models/userCommerce.dto';
import { EventTypeORMEntity } from '../../../events';
import { ProspectTypeORMEntity } from '../../../prospects';

@Entity('prospectTicket')
export class ProspectTicketTypeORMEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  fee!: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creationDate?: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedOn?: Date;

  @ManyToOne(
    () => ProspectTypeORMEntity,
    (prospect) => prospect.prospectsTicket,
    {
      eager: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  )
  prospect!: ProspectTypeORMEntity;

  @ManyToOne(() => EventTypeORMEntity, (event) => event.prospectsTicket, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  event!: EventTypeORMEntity;

  @BeforeInsert()
  async generateUUID() {
    this.id = uuidv4();
  }
}
