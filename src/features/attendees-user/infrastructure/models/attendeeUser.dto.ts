import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  BeforeInsert
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { UserCommerceTypeORMEntity } from '../../../user/infrastructure/models/userCommerce.dto';
import { EventTypeORMEntity } from '../../../events/infrastructure/models/event.dto';

@Entity('attendeeUser')
export class AttendeeUserTypeORMEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creationDate?: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedOn?: Date;

  @ManyToOne(
    () => UserCommerceTypeORMEntity,
    (userCommerce) => userCommerce.prospects,
    {
      eager: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  )
  userCommerce!: UserCommerceTypeORMEntity;

  @ManyToOne(() => EventTypeORMEntity, (event) => event.attendeesUser, {
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
