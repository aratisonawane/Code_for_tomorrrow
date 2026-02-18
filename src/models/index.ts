import User from './User';
import Plan from './Plan';
import Subscription from './Subscription';
import UsageRecord from './UsageRecord';
import sequelize from '../config/db';

// Define associations
User.hasMany(Subscription, { foreignKey: 'userId', as: 'subscriptions' });
Subscription.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Plan.hasMany(Subscription, { foreignKey: 'planId', as: 'subscriptions' });
Subscription.belongsTo(Plan, { foreignKey: 'planId', as: 'plan' });

User.hasMany(UsageRecord, { foreignKey: 'userId', as: 'usageRecords' });
UsageRecord.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export { User, Plan, Subscription, UsageRecord, sequelize };

