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

@Entity('userTicket')
export class UserTicketTypeORMEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  hasPresale!: boolean;

  @Column()
  totalAttendees!: number;

  @Column()
  fee!: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creationDate?: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedOn?: Date;

  @ManyToOne(
    () => UserCommerceTypeORMEntity,
    (userCommerce) => userCommerce.usersTicket,
    {
      eager: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  )
  userCommerce!: UserCommerceTypeORMEntity;

  @ManyToOne(() => EventTypeORMEntity, (event) => event.usersTicket, {
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
