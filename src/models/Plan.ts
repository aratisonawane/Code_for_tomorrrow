import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';

interface PlanAttributes {
  id: number;
  name: string;
  monthlyQuota: number;
  extraChargePerUnit: number;
}

interface PlanCreationAttributes extends Optional<PlanAttributes, 'id'> {}

class Plan extends Model<PlanAttributes, PlanCreationAttributes> implements PlanAttributes {
  public id!: number;
  public name!: string;
  public monthlyQuota!: number;
  public extraChargePerUnit!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Plan.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    monthlyQuota: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    extraChargePerUnit: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'Plans',
    timestamps: true
  }
);

export default Plan;

