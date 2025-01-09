import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Box, Alert } from '@mui/material';
import { api } from '../services/api';  // Import the API methods

const ComplianceUpload = ({ supplierId }) => {
  const [formData, setFormData] = useState({
    metric: '',
    result: '',
    status: ''
  });
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure 'result' is converted to a number before sending
    const formattedData = {
      ...formData,
      result: parseFloat(formData.result), // Convert the result to a float (number)
      supplier_id: supplierId,  // Ensure supplier_id is sent in the request body
    };

    try {
      const response = await api.checkCompliance(supplierId, formattedData);  // Sends data to the API
      if (response.status === 200 || response.data.status === "compliance check success") {
        setMessage({ type: 'success', text: 'Compliance data uploaded successfully' });
        setFormData({ metric: '', result: '', status: '' });  // Reset form fields
      } else {
        setMessage({ type: 'error', text: 'Failed to upload compliance data' });
      }
    } catch (error) {
      console.error('Error during compliance data upload:', error);
      setMessage({ type: 'error', text: 'Error uploading compliance data. Please try again.' });
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
          />
          <TextField
            label="Result"
            type="number"
            value={formData.result}
            onChange={(e) => setFormData({ ...formData, result: e.target.value })}
            required
          />
          <TextField
            label="Status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Upload
          </Button>
        </Box>

        {/* Display success or error message */}
        {message && (
          <Alert severity={message.type} sx={{ mt: 2 }}>
            {message.text}
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default ComplianceUpload;
