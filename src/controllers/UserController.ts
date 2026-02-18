import { Request, Response } from 'express';
import { UsageService } from '../services/UsageService';
import { BillingService } from '../services/BillingService';
import { validateUserId } from '../utils/validators';

const usageService = new UsageService();
const billingService = new BillingService();

export class UserController {
  async getCurrentUsage(req: Request, res: Response): Promise<void> {
    try {
      const id = validateUserId(req.params.id);
      if (!id) {
        res.status(400).json({ error: 'Invalid user ID' });
        return;
      }

      const data = await usageService.getCurrentUsageSummary(id);
      res.json(data);
    } catch (error: any) {
      if (error.message === 'No active subscription found for user') {
        res.status(404).json({ error: error.message });
        return;
      }
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }

  async getBillingSummary(req: Request, res: Response): Promise<void> {
    try {
      const id = validateUserId(req.params.id);
      if (!id) {
        res.status(400).json({ error: 'Invalid user ID' });
        return;
      }

      const data = await billingService.getBillingSummary(id);
      res.json(data);
    } catch (error: any) {
      if (error.message === 'No active subscription found for user') {
        res.status(404).json({ error: error.message });
        return;
      }
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }
}

