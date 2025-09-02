import { useState, useCallback } from "react";
import { AppError, logError } from "../utils/errorHandler";

export const useErrorHandler = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleError = useCallback((error, context = {}) => {
    logError(error, context);
    setError(error);
    setIsLoading(false);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const executeAsync = useCallback(
    async (asyncFunction, context = {}) => {
      try {
        setIsLoading(true);
        clearError();
        const result = await asyncFunction();
        setIsLoading(false);
        return result;
      } catch (err) {
        const appError =
          err instanceof AppError ? err : new AppError(err.message);
        handleError(appError, context);
        throw appError;
      }
    },
    [handleError, clearError]
  );

  return {
    error,
    isLoading,
    handleError,
    clearError,
    executeAsync,
  };
};
