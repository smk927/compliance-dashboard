import React, { useState, useEffect } from 'react';
import { 
  Box, Card, CardContent, Typography, Grid, 
  LinearProgress, Chip, IconButton, Button 
} from '@mui/material';
import { Visibility, Insights, Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await api.getSuppliers();
        setSuppliers(response.data);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  const getComplianceColor = (score) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'error';
  };

  if (loading) return <LinearProgress />;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Suppliers Overview
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => navigate('/suppliers/new')}
        >
          Add New Supplier
        </Button>
      </Box>

      <Grid container spacing={3}>
        {suppliers.map((supplier) => (
          <Grid item xs={12} md={6} lg={4} key={supplier.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">{supplier.name}</Typography>
                  <Chip
                    label={`${supplier.compliance_score}%`}
                    color={getComplianceColor(supplier.compliance_score)}
                  />
                </Box>
                <Typography color="text.secondary" gutterBottom>
                  {supplier.country}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Last Audit: {new Date(supplier.last_audit).toLocaleDateString()}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                  <IconButton 
                    onClick={() => navigate(`/supplier/${supplier.id}`)}
                    color="primary"
                  >
                    <Visibility />
                  </IconButton>
                  <IconButton 
                    onClick={() => navigate(`/insights/${supplier.id}`)}
                    color="secondary"
                  >
                    <Insights />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SupplierList;