import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize';
import sequelize from '../../../../database/sequelize';

class CommerceSequealizeModel extends Model<InferAttributes<CommerceSequealizeModel>, InferCreationAttributes<CommerceSequealizeModel>> {

    declare id: CreationOptional<number>;
    declare name: string;
    declare phone: number;
    declare email: string;
    declare countryCode: string;
    declare city: string;
    declare isActive: string;
    declare dateFinish: CreationOptional<string>;
    //declare creationDate: CreationOptional<string>;
    //declare updatedOn: CreationOptional<string>;
    //declare deletionDate: CreationOptional<string>;

}

CommerceSequealizeModel.init(
    {
        id: {
            type: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: new DataTypes.STRING(50),
            //allowNull: false
        },
        phone: {
            type: new DataTypes.INTEGER,
        },
        email: {
            type: new DataTypes.STRING(50),
        },
        countryCode: {
            type: new DataTypes.STRING(8),
            defaultValue: 'CO'
        },
        city: {
            type: new DataTypes.STRING(50),
        },
        isActive: {
            type: new DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true,
        },
        dateFinish: {
            type: new DataTypes.STRING(10),
            allowNull: true
        },
    },
    {
        tableName: 'commerce',
        sequelize // passing the `sequelize` instance is required
    }
)
export { CommerceSequealizeModel };



