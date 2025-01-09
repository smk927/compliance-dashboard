import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import ComplianceUpload from './ComplianceUpload';

const SupplierDetail = () => {
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await api.getSupplier(id);
        setSupplier(response.data);
      } catch (error) {
        setError('Error fetching supplier data');
        console.error('Error fetching supplier:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSupplier();
    }
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ width: '100%', mt: 4 }}>
        <LinearProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" variant="h6" sx={{ mt: 4 }}>
        {error}
      </Typography>
    );
  }

  if (!supplier) {
    return (
      <Typography variant="h6" sx={{ mt: 4 }}>
        Supplier not found
      </Typography>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {supplier.name}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Supplier Information
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography>
                  <strong>Country:</strong> {supplier.country}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                  <strong>Compliance Score:</strong> {supplier.compliance_score}%
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6">Compliance Records</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Metric</TableCell>
                  <TableCell>Result</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {supplier.compliance_records?.length ? (
                  supplier.compliance_records.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{new Date(record.date_recorded).toLocaleDateString()}</TableCell>
                      <TableCell>{record.metric}</TableCell>
                      <TableCell>{record.result}</TableCell>
                      <TableCell>{record.status}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No compliance records available.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={12}>
          <ComplianceUpload supplierId={supplier.id} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SupplierDetail;
