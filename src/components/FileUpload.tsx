// File upload component for student applications
"use client";
import { useState } from 'react';
import { Button, Alert } from './UI';

interface FileUploadProps {
  onFileSelectAction: (file: File | null) => void;
  acceptedTypes?: string;
  maxSize?: number; // in MB
  className?: string;
}

export function FileUpload({ 
  onFileSelectAction, 
  acceptedTypes = ".pdf,.doc,.docx,.jpg,.jpeg,.png", 
  maxSize = 5,
  className = "" 
}: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [isDragOver, setIsDragOver] = useState(false);

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      return `File size must be less than ${maxSize}MB`;
    }

    // Check file type
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    const accepted = acceptedTypes.split(',').map(type => type.trim());
    if (!accepted.includes(fileExtension)) {
      return `File type ${fileExtension} is not supported. Accepted types: ${acceptedTypes}`;
    }

    return null;
  };

  const handleFileSelect = (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      setSelectedFile(null);
      onFileSelectAction(null);
      return;
    }

    setError("");
    setSelectedFile(file);
    onFileSelectAction(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setError("");
    onFileSelectAction(null);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragOver 
            ? 'border-blue-500 bg-blue-50' 
            : error 
              ? 'border-red-300 bg-red-50' 
              : 'border-gray-300 bg-gray-50 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          onChange={handleFileChange}
          accept={acceptedTypes}
          className="hidden"
          id="file-upload"
        />
        
        {!selectedFile ? (
          <div>
            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="mt-4">
              <label htmlFor="file-upload" className="cursor-pointer">
                <span className="font-medium text-blue-600 hover:text-blue-500">
                  Upload a file
                </span>
                <span className="text-gray-500"> or drag and drop</span>
              </label>
              <p className="text-xs text-gray-500 mt-2">
                {acceptedTypes.replace(/\./g, '').toUpperCase()} up to {maxSize}MB
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-center space-x-2">
              <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium text-gray-900">{selectedFile.name}</span>
            </div>
            <p className="text-sm text-gray-500">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={removeFile}
            >
              Remove file
            </Button>
          </div>
        )}
      </div>

      {error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}
    </div>
  );
}