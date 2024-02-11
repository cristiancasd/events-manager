import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, PrimaryColumn, ManyToOne } from 'typeorm';
import { CommerceTypeORMEntity } from '../../../commerce';

@Entity('level')
export class LevelTypeORMEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 50 })
  name!: string;

  @Column()
  typeId!: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creationDate?: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedOn?: Date;

  @ManyToOne(
    () => CommerceTypeORMEntity,
    (commerce) => commerce.levels,
    {
      eager: true,  //cargar automaticamente la relación, que en el fron muestre el
      onDelete: 'CASCADE',
    })
  commerce!: CommerceTypeORMEntity

}
