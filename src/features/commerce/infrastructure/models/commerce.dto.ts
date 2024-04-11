import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  PrimaryColumn,
  OneToMany,
  BeforeUpdate,
  BeforeInsert
} from 'typeorm';
import { EventTypeORMEntity } from '../../../events/infrastructure/models/event.dto';
import { LevelTypeORMEntity } from '../../../levels';
import { v4 as uuidv4 } from 'uuid';
import { UserCommerceTypeORMEntity } from '../../../user/infrastructure/models/userCommerce.dto';
import { TicketTypeORMEntity } from '../../../tickets';

@Entity('commerce')
export class CommerceTypeORMEntity extends BaseEntity {
  // @PrimaryGeneratedColumn('uuid')
  @PrimaryColumn('uuid')
  id!: string;

  @Column({ length: 50, unique: true })
  name!: string;

  @Column({ length: 30, unique: true })
  nick!: string;

  @Column({ length: 20, unique: true })
  phone!: string;

  @Column({ length: 50, unique: true })
  email!: string;

  @Column({ length: 8, default: 'CO' })
  countryCode!: string;

  @Column({ length: 50 })
  city!: string;

  @Column({ type: 'integer' })
  totalFreePrevent!: number;

  @Column({ type: 'boolean', nullable: true, default: true })
  isActive!: boolean;

  @Column({ type: 'varchar', length: 10, nullable: true })
  dateFinish!: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creationDate!: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedOn!: Date;

  @OneToMany(
    () => UserCommerceTypeORMEntity,
    (userCommerce) => userCommerce.commerce
  )
  usersCommerce!: UserCommerceTypeORMEntity[];

  @OneToMany(() => TicketTypeORMEntity, (ticket) => ticket.commerce)
  tickets!: TicketTypeORMEntity[];

  @OneToMany(() => EventTypeORMEntity, (event) => event.commerce)
  events!: EventTypeORMEntity[];

  @OneToMany(() => LevelTypeORMEntity, (level) => level.commerce)
  levels!: LevelTypeORMEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  convertToUppercase() {
    this.city = this.city.toUpperCase();
    this.countryCode = this.countryCode.toUpperCase();
  }

  @BeforeInsert()
  @BeforeUpdate()
  convertToLowerCase() {
    this.nick = this.nick.toLowerCase();
  }

  @BeforeInsert()
  async generateUUID() {
    this.id = uuidv4();
  }
}
