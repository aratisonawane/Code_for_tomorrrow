# Subscription Usage & Billing System

A TypeScript-based REST API for managing subscription usage and billing using Express.js, Sequelize ORM, and MySQL.

## Features

- Record usage entries for users
- Track current month usage with remaining quota
- Generate billing summaries with extra charges calculation
- RESTful API endpoints
- TypeScript for type safety
- Sequelize ORM for database operations

## Tech Stack

- **TypeScript** - Type-safe JavaScript
- **Express.js** - Web framework
- **Sequelize** - ORM for MySQL
- **MySQL** - Database
- **Node.js** - Runtime environment

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

## Installation

1. Clone the repository and navigate to the project directory

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update the `.env` file with your MySQL database credentials:
```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=subscription_db
DB_USER=root
DB_PASSWORD=your_password
PORT=3000
NODE_ENV=development
```

5. Create the MySQL database:
```sql
CREATE DATABASE subscription_db;
```

6. Build the TypeScript code:
```bash
npm run build
```

7. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## Database Schema

### Users
- `id` (PK, INT, Auto Increment)
- `name` (VARCHAR)
- `createdAt` (TIMESTAMP)
- `updatedAt` (TIMESTAMP)

### Plans
- `id` (PK, INT, Auto Increment)
- `name` (VARCHAR)
- `monthlyQuota` (INT) - Max units allowed per month
- `extraChargePerUnit` (DECIMAL) - Cost for each unit over the quota
- `createdAt` (TIMESTAMP)
- `updatedAt` (TIMESTAMP)

### Subscriptions
- `id` (PK, INT, Auto Increment)
- `userId` (FK → Users.id)
- `planId` (FK → Plans.id)
- `startDate` (DATE)
- `isActive` (BOOLEAN)
- `createdAt` (TIMESTAMP)
- `updatedAt` (TIMESTAMP)

### UsageRecords
- `id` (PK, INT, Auto Increment)
- `userId` (FK → Users.id)
- `action` (VARCHAR)
- `usedUnits` (INT)
- `createdAt` (TIMESTAMP)

## API Endpoints

### 1. Record Usage
**POST** `/usage`

Record a usage entry for a user.

**Request Body:**
```json
{
  "userId": 1,
  "action": "api_call",
  "usedUnits": 10
}
```

**Response:**
```json
{
  "message": "Usage recorded successfully",
  "data": {
    "id": 1,
    "userId": 1,
    "action": "api_call",
    "usedUnits": 10,
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### 2. Get Current Usage
**GET** `/users/:id/current-usage`

Returns the user's total usage for the current month.

**Response:**
```json
{
  "message": "Current usage retrieved successfully",
  "data": {
    "totalUnitsUsed": 150,
    "remainingUnits": 50,
    "activePlan": {
      "id": 1,
      "name": "Basic Plan",
      "monthlyQuota": 200,
      "extraChargePerUnit": 0.5
    }
  }
}
```

### 3. Get Billing Summary
**GET** `/users/:id/billing-summary`

Returns the billing summary for the current month.

**Response:**
```json
{
  "message": "Billing summary retrieved successfully",
  "data": {
    "totalUsage": 250,
    "planQuota": 200,
    "extraUnits": 50,
    "extraCharges": 25.00,
    "activePlan": {
      "id": 1,
      "name": "Basic Plan",
      "monthlyQuota": 200,
      "extraChargePerUnit": 0.5
    }
  }
}
```

## Billing Logic

- Calculate total usage in the current calendar month
- Compare total usage to the user's plan quota
- If usage ≤ quota → extra units = 0, extra charges = 0
- If usage > quota → extra units = usage - quota
- Compute extra charges: extraUnits × extraChargePerUnit
- Round monetary values to 2 decimal places

## Project Structure

```
src/
├── config/
│   └── db.ts              # Database configuration
├── models/
│   ├── User.ts            # User model
│   ├── Plan.ts            # Plan model
│   ├── Subscription.ts    # Subscription model
│   ├── UsageRecord.ts     # UsageRecord model
│   └── index.ts           # Model associations
├── controllers/
│   ├── UsageController.ts # Usage endpoints controller
│   └── UserController.ts  # User endpoints controller
├── services/
│   ├── UsageService.ts    # Usage business logic
│   └── BillingService.ts  # Billing business logic
├── routes/
│   ├── usageRoutes.ts     # Usage routes
│   └── userRoutes.ts      # User routes
├── utils/
│   └── errorHandler.ts    # Error handling utilities
├── app.ts                 # Express app setup
└── index.ts               # Application entry point
```

## Sample Data Setup

To test the API, you can insert sample data:

```sql
-- Insert a user
INSERT INTO Users (name) VALUES ('John Doe');

-- Insert a plan
INSERT INTO Plans (name, monthlyQuota, extraChargePerUnit) 
VALUES ('Basic Plan', 200, 0.5);

-- Create a subscription
INSERT INTO Subscriptions (userId, planId, startDate, isActive) 
VALUES (1, 1, '2024-01-01', true);
```

## Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

## Development

Run in development mode with auto-reload:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

## License

ISC

## Author

aarti

