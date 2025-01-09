// src/components/Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { AssessmentOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
          <AssessmentOutlined sx={{ mr: 2 }} />
          <Typography variant="h6">
            Supplier Compliance Monitor
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;