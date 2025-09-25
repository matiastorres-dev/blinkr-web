import React from 'react';
import {
  Alert,
  AlertTitle,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box
} from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { ValidationError } from '../types';

interface ValidationErrorDisplayProps {
  error: ValidationError;
  fileName: string;
}

const ValidationErrorDisplay: React.FC<ValidationErrorDisplayProps> = ({ error, fileName }) => {
  return (
    <Alert severity="error" sx={{ mt: 1 }}>
      <AlertTitle>
        <Box display="flex" alignItems="center" gap={1}>
          <ErrorIcon fontSize="small" />
          Error in {fileName}
        </Box>
      </AlertTitle>

      <Typography variant="body2" sx={{ mb: 1 }}>
        {error.message}
      </Typography>

      {error.details && error.details.length > 0 && (
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
            Validation Details:
          </Typography>
          <List dense sx={{ pt: 0 }}>
            {error.details.map((detail, index) => (
              <ListItem key={index} sx={{ py: 0.5, pl: 0 }}>
                <ListItemText
                  primary={
                    <Typography variant="body2">
                      <strong>{detail.field}:</strong> {detail.description}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Alert>
  );
};

export default ValidationErrorDisplay;