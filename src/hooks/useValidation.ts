// Custom hook for form validation using Zod
import { useState, useCallback } from 'react';
import { ZodSchema, ZodError, ZodIssue } from 'zod';

export interface ValidationError {
  field: string;
  message: string;
}

export function useValidation<T>(schema: ZodSchema<T>) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isValidating, setIsValidating] = useState(false);

  const validate = useCallback((data: unknown): { isValid: boolean; data?: T; errors?: Record<string, string> } => {
    setIsValidating(true);
    
    try {
      const validatedData = schema.parse(data);
      setErrors({});
      setIsValidating(false);
      return { isValid: true, data: validatedData };
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors: Record<string, string> = {};
        
        error.issues.forEach((issue: ZodIssue) => {
          const path = issue.path.join('.');
          formattedErrors[path] = issue.message;
        });
        
        setErrors(formattedErrors);
        setIsValidating(false);
        return { isValid: false, errors: formattedErrors };
      }
      
      // Handle unexpected errors
      const genericError = { general: 'Validation failed' };
      setErrors(genericError);
      setIsValidating(false);
      return { isValid: false, errors: genericError };
    }
  }, [schema]);

  const validateField = useCallback((fieldName: string, value: unknown): string | null => {
    try {
      // For individual field validation, we'll validate the whole object
      // but only return the error for the specific field
      const testData = { [fieldName]: value };
      schema.parse(testData);
      
      // Clear error for this field if validation passes
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
      
      return null;
    } catch (error) {
      if (error instanceof ZodError) {
        const relevantIssue = error.issues.find(issue => 
          issue.path.length > 0 && issue.path[0] === fieldName
        );
        
        if (relevantIssue) {
          const fieldError = relevantIssue.message;
          
          setErrors(prev => ({
            ...prev,
            [fieldName]: fieldError
          }));
          
          return fieldError;
        }
      }
      return null;
    }
  }, [schema]);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const clearFieldError = useCallback((fieldName: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  }, []);

  return {
    errors,
    isValidating,
    validate,
    validateField,
    clearErrors,
    clearFieldError,
    hasErrors: Object.keys(errors).length > 0
  };
}