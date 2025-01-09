import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box, Container } from '@mui/material';
import { createTheme } from '@mui/material/styles';

// Import components
import Navbar from './components/Navbar';
import SupplierList from './components/SupplierList';
import SupplierDetail from './components/SupplierDetail';
import ComplianceInsights from './components/ComplianceInsights';

// Create dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e1e1e',
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e1e1e',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
      marginBottom: '1rem',
    },
    h6: {
      fontWeight: 600,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh',
          bgcolor: 'background.default'
        }}>
          <Navbar />
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<SupplierList />} />
              <Route path="/supplier/:id" element={<SupplierDetail />} />
              <Route path="/insights/:id" element={<ComplianceInsights />} />
            </Routes>
          </Container>
          <Box component="footer" sx={{ 
            p: 2, 
            mt: 'auto', 
            backgroundColor: 'background.paper',
            textAlign: 'center',
            borderTop: '1px solid rgba(255, 255, 255, 0.12)'
          }}>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;