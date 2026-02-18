import { Router, Request, Response, NextFunction } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();
const userController = new UserController();

const asyncHandler = (fn: (req: Request, res: Response) => Promise<void>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res)).catch(next);
  };
};

router.get('/:id/current-usage', asyncHandler((req, res) => userController.getCurrentUsage(req, res)));
router.get('/:id/billing-summary', asyncHandler((req, res) => userController.getBillingSummary(req, res)));

export default router;

