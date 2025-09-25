import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  LinearProgress,
  Alert,
  Card,
  CardContent,
  Stack
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { storesAPI, uploadAPI } from '../services/api';
import { Store, UploadFile, UploadStatus, UploadResult, ValidationError } from '../types';
import UploadResultTable from './UploadResultTable';
import ValidationErrorDisplay from './ValidationErrorDisplay';

const FileUploader: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedStore, setSelectedStore] = useState<string>('');
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadResults, setUploadResults] = useState<UploadResult[]>([]);

  useEffect(() => {
    const loadStores = async () => {
      try {
        const storeList = await storesAPI.getStores();
        console.log('Stores loaded:', storeList); // Debug log
        setStores(storeList);
        if (storeList.length > 0) {
          const firstStoreId = storeList[0].id.toString();
          console.log('Setting first store ID:', firstStoreId); // Debug log
          setSelectedStore(firstStoreId);
        }
      } catch (error) {
        console.error('Error loading stores:', error); // Debug log
        setError('Failed to load stores');
      }
    };

    loadStores();
  }, []);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    const newFiles: UploadFile[] = Array.from(selectedFiles).map(file => ({
      file,
      name: file.name,
      progress: 0,
      status: UploadStatus.Pending
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Start uploading each file
    newFiles.forEach(uploadFile);
  };

  const uploadFile = async (fileItem: UploadFile) => {
    if (!selectedStore || selectedStore === '' || selectedStore === 'NaN') {
      console.error('Invalid store selection:', selectedStore);
      setError('Please select a valid store');
      return;
    }

    console.log('Selected store for upload:', selectedStore, 'Type:', typeof selectedStore); // Debug log

    // Update status to uploading
    setFiles(prev =>
      prev.map(f =>
        f.file === fileItem.file
          ? { ...f, status: UploadStatus.Uploading, progress: 0 }
          : f
      )
    );

    try {
      const result = await uploadAPI.uploadFile(
        fileItem.file,
        selectedStore,
        (progress) => {
          setFiles(prev =>
            prev.map(f =>
              f.file === fileItem.file
                ? { ...f, progress }
                : f
            )
          );
        }
      );

      console.log('Upload successful:', result); // Debug log

      // Add to results
      setUploadResults(prev => [...prev, result]);

      // Mark as completed and store result
      setFiles(prev =>
        prev.map(f =>
          f.file === fileItem.file
            ? { ...f, status: UploadStatus.Done, progress: 100, result }
            : f
        )
      );
    } catch (error: any) {
      console.error('Upload error:', error);

      // Parse validation error if available
      let validationError: ValidationError | undefined;

      if (error.response?.data) {
        const errorData = error.response.data;
        if (errorData.message || errorData.details) {
          validationError = {
            message: errorData.message || 'Validation Error',
            details: errorData.details || []
          };
        }
      }

      setFiles(prev =>
        prev.map(f =>
          f.file === fileItem.file
            ? { ...f, status: UploadStatus.Error, error: validationError }
            : f
        )
      );
    }
  };

  const isValidFileType = (file: File) => {
    const validTypes = [
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    return validTypes.includes(file.type) ||
           file.name.endsWith('.csv') ||
           file.name.endsWith('.xls') ||
           file.name.endsWith('.xlsx');
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
      Select a store and upload your ASN
      </Typography>

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={3}
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <FormControl sx={{ minWidth: 300 }}>
          <InputLabel>Store</InputLabel>
          <Select
            value={selectedStore}
            label="Store"
            onChange={(e) => {
              const value = e.target.value;
              console.log('Store selection changed to:', value); // Debug log
              setSelectedStore(value);
            }}
          >
            {stores.map((store) => (
              <MenuItem key={store.id} value={store.id.toString()}>
                {store.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          component="label"
          startIcon={<CloudUploadIcon />}
          disabled={!selectedStore || loading}
          sx={{ minWidth: 200 }}
        >
          Upload Files
          <input
            type="file"
            hidden
            multiple
            accept=".csv,.xls,.xlsx"
            onChange={handleFileSelect}
          />
        </Button>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Accepted file types: CSV, XLS, XLSX
      </Typography>

      {files.length > 0 && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Upload Progress
          </Typography>
          {files.map((file, index) => (
            <Card key={index} sx={{ mb: 2 }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="body1">
                    {file.name}
                  </Typography>
                  <Typography variant="body2">
                    {file.status === UploadStatus.Done ? '✅' :
                     file.status === UploadStatus.Error ? '❌' :
                     `${file.progress}%`}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={file.progress}
                  sx={{ height: 8, borderRadius: 4 }}
                />
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                  Status: {file.status}
                </Typography>

                {file.error && (
                  <ValidationErrorDisplay error={file.error} fileName={file.name} />
                )}
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* <UploadResultTable results={uploadResults} /> */}
    </Box>
  );
};

export default FileUploader;