import { UsageService } from './UsageService';

export class BillingService {
  private usageService: UsageService;

  constructor() {
    this.usageService = new UsageService();
  }

  async getBillingSummary(userId: number) {
    const usage = await this.usageService.getCurrentMonthUsage(userId);
    const sub = await this.usageService.getActiveSubscription(userId);

    if (!sub) {
      throw new Error('No active subscription found for user');
    }

    const plan = sub.plan;
    const quota = plan.monthlyQuota;
    const extra = Math.max(0, usage - quota);
    const chargePerUnit = parseFloat(plan.extraChargePerUnit.toString());
    const extraCharges = parseFloat((extra * chargePerUnit).toFixed(2));

    return {
      totalUsage: usage,
      planQuota: quota,
      extraUnits: extra,
      extraCharges: extraCharges,
      activePlan: {
        id: plan.id,
        name: plan.name,
        monthlyQuota: plan.monthlyQuota,
        extraChargePerUnit: chargePerUnit
      }
    };
  }
}

