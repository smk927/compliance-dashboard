import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  Alert,
  Divider
} from '@mui/material';
import { api } from '../services/api';
import ComplianceRecordsList from './ComplianceRecordsList';

const ComplianceUpload = ({ supplierId }) => {
  const [formData, setFormData] = useState({
    metric: '',
    result: '',
    status: ''
  });
  const [message, setMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [records, setRecords] = useState([]);

  // Fetch compliance records when component mounts or after successful upload
  const fetchRecords = async () => {
    try {
      const response = await api.getComplianceRecords(supplierId);
      setRecords(response.data);
    } catch (error) {
      console.error('Error fetching compliance records:', error);
      setMessage({ type: 'error', text: 'Error loading compliance records' });
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [supplierId]);

  const validateForm = () => {
    if (!formData.metric || !formData.result || !formData.status) {
      setMessage({ type: 'error', text: 'All fields are required' });
      return false;
    }
    if (isNaN(parseFloat(formData.result))) {
      setMessage({ type: 'error', text: 'Result must be a valid number' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setMessage(null);

    const formattedData = {
      metric: formData.metric,
      result: parseFloat(formData.result),
      status: formData.status
    };

    try {
      const response = await api.checkCompliance(supplierId, formattedData);
      setMessage({ type: 'success', text: response.data.message });
      setFormData({ metric: '', result: '', status: '' });
      // Refresh the records list after successful upload
      await fetchRecords();
    } catch (error) {
      console.error('Error during compliance data upload:', error);
      const errorMessage = error.response?.data?.detail || 'Error uploading compliance data. Please try again.';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Upload Compliance Data
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Metric"
            value={formData.metric}
            onChange={(e) => setFormData({ ...formData, metric: e.target.value })}
            required
            disabled={isSubmitting}
          />
          <TextField
            label="Result"
            type="number"
            value={formData.result}
            onChange={(e) => setFormData({ ...formData, result: e.target.value })}
            required
            disabled={isSubmitting}
          />
          <TextField
            label="Status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            required
            disabled={isSubmitting}
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Uploading...' : 'Upload'}
          </Button>
        </Box>

        {message && (
          <Alert severity={message.type} sx={{ mt: 2 }}>
            {message.text}
          </Alert>
        )}

        <Divider sx={{ my: 3 }} />
        
        <ComplianceRecordsList records={records} />
      </CardContent>
    </Card>
  );
};

export default ComplianceUpload;