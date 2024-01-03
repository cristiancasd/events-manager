import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, PrimaryColumn, OneToMany } from 'typeorm';
import { EventTypeORMEntity } from '../../../events/infrastructure/models/event.dto';

@Entity('commerce')
export class CommerceTypeORMEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  //@PrimaryColumn('string')
  id!: string;

  @Column({ length: 50, unique: true })
  name!: string;

  @Column({ type: 'integer', unique: true })
  phone!: number;

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
    () => EventTypeORMEntity,
    (event) => event.commerce,
  )
  events!: EventTypeORMEntity[];
}
