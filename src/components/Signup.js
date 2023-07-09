import React from 'react';
import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material';

const Signup = () => {
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          SIGNUP
        </Typography>
        <TextField label="Email" fullWidth margin="normal" />
        <TextField label="Name" fullWidth margin="normal" />
        <TextField label="Password" fullWidth margin="normal" type="password" />
        <TextField
          label="Confirm Password"
          fullWidth
          margin="normal"
          type="password"
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2, mb: 2 }}
        >
          Signup
        </Button>
      </Paper>
      <Box mt={2} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="body2" gutterBottom>
          Already have an account?
        </Typography>
        <Button variant="outlined" color="primary">
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default Signup;
