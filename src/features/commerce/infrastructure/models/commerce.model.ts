import { Model, Column, Table, DataType, CreatedAt, UpdatedAt, DeletedAt, PrimaryKey, Default } from 'sequelize-typescript';
import { Optional } from 'sequelize/types';
import { CommerceEntity } from '../../domain/commerce.entity';

// Utiliza la interfaz Optional en la definición del modelo
interface CommerceCreationAttributes extends Optional<CommerceEntity, 'id'> { }

@Table
export class CommerceModel extends Model<CommerceModel, CommerceCreationAttributes> {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
    })
    id!: string;

    @Column
    name!: string;

    @Column
    phone!: number;

    @Column
    email!: string;

    @Column
    country!: string;

    @Column
    city!: string;

    @Column
    totalFreePrevent!: number;


    @Column
    isActive!: boolean;

    @Column
    dateFinish!: Date;

    @CreatedAt
    creationDate?: Date;

    @UpdatedAt
    updatedOn?: Date;

    @DeletedAt
    deletionDate?: Date;
}

export { CommerceCreationAttributes };
