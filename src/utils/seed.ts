import { User, Plan, Subscription } from '../models';
import sequelize from '../config/db';

/**
 * Seed script to populate initial data
 * Run this after database is set up
 */
export const seedDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected for seeding...');

    // Create sample users
    const user1 = await User.create({ name: 'John Doe' });
    const user2 = await User.create({ name: 'Jane Smith' });
    console.log('Users created');

    // Create sample plans
    const basicPlan = await Plan.create({
      name: 'Basic Plan',
      monthlyQuota: 200,
      extraChargePerUnit: 0.5
    });

    const premiumPlan = await Plan.create({
      name: 'Premium Plan',
      monthlyQuota: 1000,
      extraChargePerUnit: 0.3
    });
    console.log('Plans created');

    // Create subscriptions
    await Subscription.create({
      userId: user1.id,
      planId: basicPlan.id,
      startDate: new Date(),
      isActive: true
    });

    await Subscription.create({
      userId: user2.id,
      planId: premiumPlan.id,
      startDate: new Date(),
      isActive: true
    });
    console.log('Subscriptions created');

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
};

// Run seed if this file is executed directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('Seeding completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seeding failed:', error);
      process.exit(1);
    });
}

