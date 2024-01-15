import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, PrimaryColumn, ManyToOne } from 'typeorm';
import { CommerceTypeORMEntity } from '../../../commerce';

@Entity('event')
export class EventTypeORMEntity {
  @PrimaryGeneratedColumn('uuid')
  //@PrimaryColumn('string')
  id!: string;

  @Column({ length: 50 })
  name!: string;

  @Column({ length: 50 })
  description?: string;

  @Column()
  date!: Date;

  @Column({ length: 50 })
  url?: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creationDate?: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedOn?: Date;



  @ManyToOne(
    () => CommerceTypeORMEntity,
    (commerce) => commerce.events,
    {
      eager: true,  //cargar automaticamente la relación, que en el fron muestre el
      onDelete: 'CASCADE',
    })
  commerce!: CommerceTypeORMEntity

}
