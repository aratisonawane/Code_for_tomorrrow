import { app, connectDB } from './app';

const PORT = process.env.PORT || 3000;

// Start server
const startServer = async () => {
  try {
    // Connect to database
    await connectDB();

    // Start Express server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

