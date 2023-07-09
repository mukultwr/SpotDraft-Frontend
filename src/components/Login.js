import React, { useState } from 'react';
import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, backgroundColor: '#f5f5f5' }}>
        <Typography variant="h4" align="center" gutterBottom>
          LOGIN
        </Typography>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          fullWidth
          margin="normal"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <Button onClick={handleTogglePassword} size="small">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </Button>
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2, mb: 2 }}
        >
          Login
        </Button>
      </Paper>
      <Box mt={2} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="body2">
          Signup for new User?
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Signup
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
