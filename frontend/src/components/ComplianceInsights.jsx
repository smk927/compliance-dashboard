// src/components/ComplianceInsights.jsx
import React, { useState, useEffect } from 'react';
import { 
  Box, Card, CardContent, Typography, 
  LinearProgress, List, ListItem, ListItemText 
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';

const ComplianceInsights = () => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchInsights = async () => {
        try {
          const response = await api.getInsights(id);
          setInsights(response.data.insights);  // Ensures the insights response works
        } catch (error) {
          console.error('Error fetching insights:', error);
        } finally {
          setLoading(false);
        }
      };

    fetchInsights();
  }, [id]);

  if (loading) return <LinearProgress />;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Compliance Insights
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            AI-Generated Recommendations
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
            {insights}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ComplianceInsights;
