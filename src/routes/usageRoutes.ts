import { Router, Request, Response, NextFunction } from 'express';
import { UsageController } from '../controllers/UsageController';

const router = Router();
const usageController = new UsageController();

// Async error handler wrapper
const asyncHandler = (fn: (req: Request, res: Response) => Promise<void>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res)).catch(next);
  };
};

router.post('/', asyncHandler((req, res) => usageController.recordUsage(req, res)));

export default router;

