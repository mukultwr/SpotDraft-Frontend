import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';

const Share = ({ sharedLink }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(sharedLink);
    setCopySuccess(true);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '27px', color: '#1BB9CD' }}>SHARE</h1>
      <TextField
        value={sharedLink}
        fullWidth
        InputProps={{
          readOnly: true,
        }}
      />
      <Button variant="contained" onClick={handleCopyLink} sx={{ marginTop: '20px' }}>
        {copySuccess ? 'Copied!' : 'Copy Link'}
      </Button>
    </div>
  );
};

export default Share;
