// components/ComplianceRecordsList.jsx
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography
} from '@mui/material';

const ComplianceRecordsList = ({ records }) => {
  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Compliance Records
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Record ID</TableCell>
            <TableCell>Supplier ID</TableCell>
            <TableCell>Metric</TableCell>
            <TableCell>Date Recorded</TableCell>
            <TableCell>Result</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{record.id}</TableCell>
              <TableCell>{record.supplier_id}</TableCell>
              <TableCell>{record.metric}</TableCell>
              <TableCell>{new Date(record.date_recorded).toLocaleDateString()}</TableCell>
              <TableCell>{record.result}</TableCell>
              <TableCell>{record.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ComplianceRecordsList;