import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Grid,
  Alert,
  Snackbar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const CreateSupplierForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    contract_terms: '',
    compliance_score: '0',
    last_audit: new Date().toISOString().split('T')[0]
  });
  
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.country) {
      setError('Name and Country are required fields');
      return;
    }

    const score = parseInt(formData.compliance_score, 10);
    if (isNaN(score) || score < 0 || score > 100) {
      setError('Compliance score must be between 0 and 100');
      return;
    }

    try {
      const response = await api.createSupplier({
        ...formData,
        compliance_score: score
      });

      setSuccess(true);
      setTimeout(() => {
        navigate(`/supplier/${response.data.id}`);
      }, 1500);
    } catch (error) {
      setError(error.response?.data?.detail || 'Error creating supplier');
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Add New Supplier
      </Typography>
      
      <Card sx={{ bgcolor: 'background.paper' }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Supplier Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  variant="filled"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  variant="filled"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Contract Terms"
                  name="contract_terms"
                  value={formData.contract_terms}
                  onChange={handleChange}
                  variant="filled"
                  placeholder="Enter contract terms and conditions"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  type="number"
                  label="Compliance Score"
                  name="compliance_score"
                  value={formData.compliance_score}
                  onChange={handleChange}
                  variant="filled"
                  inputProps={{
                    min: 0,
                    max: 100
                  }}
                  helperText="Score must be between 0 and 100"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  type="date"
                  label="Last Audit Date"
                  name="last_audit"
                  value={formData.last_audit}
                  onChange={handleChange}
                  variant="filled"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Create Supplier
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success">
          Supplier created successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateSupplierForm;