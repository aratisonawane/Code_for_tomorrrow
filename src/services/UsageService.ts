import { Op } from 'sequelize';
import UsageRecord from '../models/UsageRecord';
import Subscription from '../models/Subscription';
import Plan from '../models/Plan';

export class UsageService {
  async recordUsage(userId: number, action: string, usedUnits: number): Promise<UsageRecord> {
    return await UsageRecord.create({
      userId,
      action,
      usedUnits
    });
  }

  async getCurrentMonthUsage(userId: number): Promise<number> {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

    const total = await UsageRecord.sum('usedUnits', {
      where: {
        userId,
        createdAt: {
          [Op.between]: [start, end]
        }
      }
    });

    return total || 0;
  }

  async getActiveSubscription(userId: number): Promise<Subscription | null> {
    return await Subscription.findOne({
      where: {
        userId,
        isActive: true
      },
      include: [{
        model: Plan,
        as: 'plan'
      }]
    });
  }

  async getCurrentUsageSummary(userId: number) {
    const used = await this.getCurrentMonthUsage(userId);
    const sub = await this.getActiveSubscription(userId);

    if (!sub) {
      throw new Error('No active subscription found for user');
    }

    const plan = sub.plan;
    const remaining = Math.max(0, plan.monthlyQuota - used);

    return {
      totalUnitsUsed: used,
      remainingUnits: remaining,
      activePlan: {
        id: plan.id,
        name: plan.name,
        monthlyQuota: plan.monthlyQuota,
        extraChargePerUnit: parseFloat(plan.extraChargePerUnit.toString())
      }
    };
  }
}

