import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany
} from 'typeorm';
import { UserCommerceTypeORMEntity } from './userCommerce.dto';
import { v4 as uuidv4 } from 'uuid';

@Entity('user')
export class UserTypeORMEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 50 })
  name!: string;

  @Column({ length: 15, unique: true })
  phone!: string;

  @Column({ length: 50, unique: true })
  email!: string;

  @Column({ length: 15, unique: true })
  document!: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creationDate?: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedOn?: Date;

  @BeforeInsert()
  @BeforeUpdate()
  convertToUppercase() {
    this.email = this.email.toLocaleLowerCase();
    this.name = this.name.toLocaleLowerCase();
  }

  @OneToMany(
    () => UserCommerceTypeORMEntity,
    (userCommerce) => userCommerce.user,
    {
      cascade: true
    }
  )
  usersCommerce!: UserCommerceTypeORMEntity[];

  @BeforeInsert()
  async generateUUID() {
    this.id = uuidv4();
  }
}
