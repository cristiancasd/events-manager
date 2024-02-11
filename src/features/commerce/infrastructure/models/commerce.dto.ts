import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, PrimaryColumn, OneToMany, BeforeUpdate, BeforeInsert } from 'typeorm';
import { EventTypeORMEntity } from '../../../events/infrastructure/models/event.dto';
import { LevelTypeORMEntity } from '../../../levels';

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
    //  { cascade: true },
  )
  events!: EventTypeORMEntity[];

  @OneToMany(
    () => LevelTypeORMEntity,
    (level) => level.commerce,
    //  { cascade: true },
  )
  levels!: LevelTypeORMEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  convertToUppercase() {
    this.city = this.city.toUpperCase();
    this.countryCode = this.countryCode.toUpperCase();
  }
}
