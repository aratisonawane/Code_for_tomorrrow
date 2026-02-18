import { Request, Response } from 'express';
import { UsageService } from '../services/UsageService';
import { validateUserId, validateUsedUnits, validateAction } from '../utils/validators';

const usageService = new UsageService();

export class UsageController {
  async recordUsage(req: Request, res: Response): Promise<void> {
    try {
      const { userId, action, usedUnits } = req.body;

      const id = validateUserId(userId);
      if (!id) {
        res.status(400).json({ error: 'Invalid userId' });
        return;
      }

      const act = validateAction(action);
      if (!act) {
        res.status(400).json({ error: 'Invalid action' });
        return;
      }

      const units = validateUsedUnits(usedUnits);
      if (units === null) {
        res.status(400).json({ error: 'Invalid usedUnits' });
        return;
      }

      const result = await usageService.recordUsage(id, act, units);
      res.status(201).json(result);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: 'Failed to record usage' });
    }
  }
}

