export const getErrorMessage = (error: unknown, fallback?: string): string => {
  if (typeof error === 'string') return error;
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === 'object' && error !== null) {
    if ('message' in error && typeof error.message === 'string')
      return error.message;
    if ('error' in error && typeof error.error === 'string') return error.error;
    if ('errors' in error) {
      const errors = error.errors;
      if (
        Array.isArray(errors) &&
        errors[0] &&
        typeof errors[0]?.message === 'string'
      )
        return errors[0].message;
    }
  }
  return fallback || 'Не удалось выполнить запрос!';
};
