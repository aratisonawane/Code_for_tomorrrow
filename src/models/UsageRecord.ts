import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';
import User from './User';

interface UsageRecordAttributes {
  id: number;
  userId: number;
  action: string;
  usedUnits: number;
  createdAt: Date;
}

interface UsageRecordCreationAttributes extends Optional<UsageRecordAttributes, 'id' | 'createdAt'> {}

class UsageRecord extends Model<UsageRecordAttributes, UsageRecordCreationAttributes> implements UsageRecordAttributes {
  public id!: number;
  public userId!: number;
  public action!: string;
  public usedUnits!: number;
  public createdAt!: Date;

  public readonly updatedAt!: Date;
}

UsageRecord.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false
    },
    usedUnits: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    tableName: 'UsageRecords',
    timestamps: true,
    updatedAt: false
  }
);

export default UsageRecord;

