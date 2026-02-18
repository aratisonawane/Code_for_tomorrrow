import { UsageService } from './UsageService';
import Subscription from '../models/Subscription';
import Plan from '../models/Plan';

export class BillingService {
  private usageService: UsageService;

  constructor() {
    this.usageService = new UsageService();
  }

  /**
   * Get billing summary for a user in the current month
   */
  async getBillingSummary(userId: number) {
    const totalUsage = await this.usageService.getCurrentMonthUsage(userId);
    const subscription = await this.usageService.getActiveSubscription(userId);

    if (!subscription) {
      throw new Error('No active subscription found for user');
    }

    const plan = subscription.plan;
    const planQuota = plan.monthlyQuota;
    const extraUnits = Math.max(0, totalUsage - planQuota);
    const extraChargePerUnit = parseFloat(plan.extraChargePerUnit.toString());
    const extraCharges = parseFloat((extraUnits * extraChargePerUnit).toFixed(2));

    return {
      totalUsage,
      planQuota,
      extraUnits,
      extraCharges,
      activePlan: {
        id: plan.id,
        name: plan.name,
        monthlyQuota: plan.monthlyQuota,
        extraChargePerUnit: extraChargePerUnit
      }
    };
  }
}

