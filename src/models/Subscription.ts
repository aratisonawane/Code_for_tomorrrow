import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';
import User from './User';
import Plan from './Plan';

interface SubscriptionAttributes {
  id: number;
  userId: number;
  planId: number;
  startDate: Date;
  isActive: boolean;
}

interface SubscriptionCreationAttributes extends Optional<SubscriptionAttributes, 'id'> {}

class Subscription extends Model<SubscriptionAttributes, SubscriptionCreationAttributes> implements SubscriptionAttributes {
  public id!: number;
  public userId!: number;
  public planId!: number;
  public startDate!: Date;
  public isActive!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Subscription.init(
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
    planId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Plan,
        key: 'id'
      }
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    sequelize,
    tableName: 'Subscriptions',
    timestamps: true
  }
);

export default Subscription;

