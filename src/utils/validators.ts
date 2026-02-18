/**
 * Validation utilities
 */

export const validateUserId = (userId: any): number | null => {
  const parsed = typeof userId === 'string' ? parseInt(userId, 10) : userId;
  if (isNaN(parsed) || parsed <= 0) {
    return null;
  }
  return parsed;
};

export const validateUsedUnits = (usedUnits: any): number | null => {
  if (typeof usedUnits !== 'number' && typeof usedUnits !== 'string') {
    return null;
  }
  const parsed = typeof usedUnits === 'string' ? parseInt(usedUnits, 10) : usedUnits;
  if (isNaN(parsed) || parsed < 0) {
    return null;
  }
  return parsed;
};

export const validateAction = (action: any): string | null => {
  if (typeof action !== 'string' || action.trim().length === 0) {
    return null;
  }
  return action.trim();
};


