import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  BeforeInsert
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { EventTypeORMEntity } from '../../../events/infrastructure/models/event.dto';
import { ProspectTypeORMEntity } from '../../../prospects';

@Entity('attendeeUser')
export class AttendeeProspectTypeORMEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creationDate?: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedOn?: Date;

  @ManyToOne(
    () => ProspectTypeORMEntity,
    (prospect) => prospect.attendeesProspect,
    {
      eager: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  )
  prospect!: ProspectTypeORMEntity;

  @ManyToOne(() => EventTypeORMEntity, (event) => event.attendeesProspect, {
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
