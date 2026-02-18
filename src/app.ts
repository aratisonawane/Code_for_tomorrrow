import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import usageRoutes from './routes/usageRoutes';
import userRoutes from './routes/userRoutes';
import { sequelize } from './models';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/usage', usageRoutes);
app.use('/users', userRoutes);

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    message: 'Server is running'
  });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'An unexpected error occurred'
  });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Route not found'
  });
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

export { app, connectDB };

