import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  PrimaryColumn,
  ManyToOne,
  OneToMany,
  BeforeInsert
} from 'typeorm';
import { CommerceTypeORMEntity } from '../../../commerce';
import { UserTypeORMEntity } from '../../../user/infrastructure/models/users.dto';
import { UserCommerceTypeORMEntity } from '../../../user/infrastructure/models/userCommerce.dto';
import { v4 as uuidv4 } from 'uuid';
import { TicketTypeORMEntity } from '../../../tickets';
import { UserTicketTypeORMEntity } from '../../../user-ticket';

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

  @OneToMany(
    () => UserCommerceTypeORMEntity,
    (userCommerce) => userCommerce.level
  )
  usersCommerce!: UserCommerceTypeORMEntity[];

  @OneToMany(() => TicketTypeORMEntity, (ticket) => ticket.level)
  tickets!: TicketTypeORMEntity[];

  @ManyToOne(() => CommerceTypeORMEntity, (commerce) => commerce.levels, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  commerce!: CommerceTypeORMEntity;

  @BeforeInsert()
  async generateUUID() {
    this.id = uuidv4();
  }
}
