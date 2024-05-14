import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  BeforeInsert,
  PrimaryColumn,
  OneToMany
} from 'typeorm';
import { CommerceTypeORMEntity } from '../../../commerce';
import { v4 as uuidv4 } from 'uuid';
import { AttendeeUserTypeORMEntity } from '../../../attendees-user';
import { AttendeeProspectTypeORMEntity } from '../../../attendees-prospect/infrastructure/models/attendeeProspect.dto';
import { UserTicketTypeORMEntity } from '../../../user-ticket';

@Entity('event')
export class EventTypeORMEntity {
  @PrimaryGeneratedColumn('uuid')
  //@PrimaryColumn('uuid')
  id!: string;

  @Column({ length: 50 })
  name!: string;

  @Column({ length: 50, nullable: true  })
  description?: string;

  @Column()
  date!: Date;

  @Column({ length: 50, nullable: true  })
  url?: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creationDate?: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedOn?: Date;

  @ManyToOne(() => CommerceTypeORMEntity, (commerce) => commerce.events, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  commerce!: CommerceTypeORMEntity;

  @OneToMany(() => AttendeeUserTypeORMEntity, (attendee) => attendee.event)
  attendeesUser!: AttendeeUserTypeORMEntity[];

  @OneToMany(() => AttendeeProspectTypeORMEntity, (attendee) => attendee.event)
  attendeesProspect!: AttendeeProspectTypeORMEntity[];

  @OneToMany(() => UserTicketTypeORMEntity, (userTicket) => userTicket.event)
  usersTicket!: UserTicketTypeORMEntity[];

  @BeforeInsert()
  async generateUUID() {
    this.id = uuidv4();
  }
}
