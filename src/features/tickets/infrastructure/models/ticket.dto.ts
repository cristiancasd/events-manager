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
import { LevelTypeORMEntity } from '../../../levels';

@Entity('ticket')
export class TicketTypeORMEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 50 })
  name!: string;

  @Column()
  presaleFee!: number;

  @Column()
  saleFee!: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creationDate?: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedOn?: Date;

  @ManyToOne(() => CommerceTypeORMEntity, (commerce) => commerce.tickets, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  commerce!: CommerceTypeORMEntity;

  @ManyToOne(() => LevelTypeORMEntity, (level) => level.tickets, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  level!: LevelTypeORMEntity;

  @BeforeInsert()
  async generateUUID() {
    this.id = uuidv4();
  }
}
