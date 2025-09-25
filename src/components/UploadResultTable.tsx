import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  Chip,
  Typography,
  Box
} from '@mui/material';
import {
  KeyboardArrowDown,
  KeyboardArrowRight
} from '@mui/icons-material';
import { UploadResult, UploadItem } from '../types';

interface UploadResultTableProps {
  results: UploadResult[];
}

interface ExpandableRowProps {
  result: UploadResult;
}

const ItemsTable: React.FC<{ items: UploadItem[] }> = ({ items }) => (
  <TableContainer component={Paper} sx={{ mt: 1, mb: 2 }}>
    <Table size="small">
      <TableHead>
        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
          <TableCell><strong>SKU</strong></TableCell>
          <TableCell><strong>Name</strong></TableCell>
          <TableCell><strong>Brand</strong></TableCell>
          <TableCell align="right"><strong>Quantity</strong></TableCell>
          <TableCell align="right"><strong>Price</strong></TableCell>
          <TableCell align="right"><strong>Subtotal</strong></TableCell>
          <TableCell><strong>Batch Lot</strong></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.sku}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.brand}</TableCell>
            <TableCell align="right">{item.quantity}</TableCell>
            <TableCell align="right">${item.price.toFixed(2)}</TableCell>
            <TableCell align="right">${item.subTotal.toFixed(2)}</TableCell>
            <TableCell>{item.batchLot}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

const ExpandableRow: React.FC<ExpandableRowProps> = ({ result }) => {
  const [open, setOpen] = useState(false);

  // Safety check for order
  if (!result || !result.order) {
    return (
      <TableRow>
        <TableCell colSpan={8}>
          <Typography color="error">Invalid result structure</Typography>
        </TableCell>
      </TableRow>
    );
  }

  const { order } = result;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'warning';
      case 'completed': return 'success';
      case 'error': return 'error';
      default: return 'default';
    }
  };

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {order.asnId}
        </TableCell>
        <TableCell>{order.name}</TableCell>
        <TableCell>
          <Chip
            label={order.status}
            color={getStatusColor(order.status)}
            size="small"
          />
        </TableCell>
        <TableCell align="right">{order.cases}</TableCell>
        <TableCell align="right">{order.items.length}</TableCell>
        <TableCell align="right">${order.cost}</TableCell>
        <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              <Typography variant="h6" gutterBottom component="div">
                Items Details ({order.items.length} items)
              </Typography>
              <ItemsTable items={order.items} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const UploadResultTable: React.FC<UploadResultTableProps> = ({ results }) => {
  if (results.length === 0) {
    return null;
  }

  console.log({results})

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Upload Results
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell><strong>ASN ID</strong></TableCell>
              <TableCell><strong>File Name</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell align="right"><strong>Cases</strong></TableCell>
              <TableCell align="right"><strong>Items</strong></TableCell>
              <TableCell align="right"><strong>Total Cost</strong></TableCell>
              <TableCell><strong>Created</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((result, index) => (
              <ExpandableRow key={index} result={result} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UploadResultTable;