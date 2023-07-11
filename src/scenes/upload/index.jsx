import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { Alert, Button, CircularProgress, Snackbar, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import firebase from '../../Firebase';
import Navbar from '../navbar';
import Share from '../share/index.jsx';

function Upload() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [result, setResult] = useState({});
  const [severity, setSeverity] = useState('success');
  const [sharedLink, setSharedLink] = useState('');

  const onDrop = (acceptedFiles) => {
    setSelectedFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxFiles: 3,
    onDrop,
  });
  const buttonColor = selectedFiles.length > 0 ? '#1ecbe1' : '#e7e7e7';

  const uploadFiles = async () => {
    let bucketName = 'pdfs';
    let file = selectedFiles[0];
    console.log({ file });
    let storageRef = firebase.storage().ref(`${bucketName}/${file.name}`);
    console.log('fat rha hai');
    let uploadTask = storageRef.put(file);
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        setUploading(true);
      },
      (error) => {
        console.log(error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('File available at', downloadURL);
          axios
            .post('http://localhost:3000/api/upload', {
              file: downloadURL,
            })
            .then((res) => {
              console.log(res.data);
              setResult(res.data.message);
              setSeverity('success');
              setSnackOpen(true);
              setUploading(false);
              setSharedLink(downloadURL); // Set the sharedLink state
            })
            .catch((err) => {
              console.log(err);
              setResult(err);
              setSeverity('error');
              setSnackOpen(true);
              setUploading(false);
            });
        });
      }
    );
  };

  useEffect(() => {
    document.title = 'Home - PDF management';
  }, []);

  console.log(selectedFiles);

  return (
    <>
      <Navbar />
      
      <div style={{ display: 'flex', marginTop: '40px', marginBottom: '20px' }}>
        <div style={{ flex: '1', marginRight: '20px' }}>
          <Stack
            className="container"
            sx={{
              borderRadius: '3px',
              bgcolor: 'white',
              width: {
                xs: '500px',
                sm: '350px',
                md: '450px',
                lg: '500px',
              },
              minHeight: '350px',
              maxHeight: '600px',
              boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.05)',
              alignItems: 'center',
            }}
          >
            <h1 style={{ fontSize: '27px', color: '#1BB9CD' }}>UPLOAD HERE</h1>
            <Stack
              {...getRootProps({ className: 'dropzone' })}
              style={{
                height: '120px',
                justifyItems: 'center',
                justifyContent: 'center',
              }}
              sx={{
                border: '2px dashed #1ecbe1',
                width: {
                  xs: '430px',
                  sm: '320px',
                  md: '370px',
                  lg: '430px',
                },
                borderRadius: '3px',
                cursor: 'pointer',
                minHeight: '250px',
                color: 'gray',
              }}
            >
              <input {...getInputProps()} />
              <Typography gutterBottom marginLeft="20px" marginRight="20px" component="div">
                <p>Drag 'n' drop some files here, or click to select files</p>
                <em>(Only *.pdf files and maximum 3 files will only be accepted )</em>
              </Typography>
            </Stack>
            <Stack
              marginTop="30px"
              alignContent="flex-start"
              textAlign="left"
              alignItems="flex-start"
              width={{
                xs: '430px',
                sm: '320px',
                md: '370px',
                lg: '430px',
              }}
            >
              {selectedFiles.map((file, index) => (
                <Fragment key={index}>
                  <Button
                    size="small"
                    variant="contained"
                    sx={{
                      maxWidth: {
                        xs: '430px',
                        sm: '320px',
                        md: '370px',
                        lg: '430px',
                      },
                      borderRadius: '50px',
                      padding: '15px',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      textAlign: 'left',
                      maxHeight: '35px',
                      backgroundColor: '#1ecbe1',
                      color: 'black',
                    }}
                    endIcon={<CancelRoundedIcon />}
                    onClick={() => {
                      let arr = selectedFiles.map((file) => file);
                      arr.splice(index, 1);
                      setSelectedFiles(arr);
                    }}
                    disabled={uploading}
                  >
                    <Typography
                      style={{
                        maxHeight: '20px',
                        maxWidth: {
                          xs: '430px',
                          sm: '320px',
                          md: '430px',
                        },
                        fontSize: '12px',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                      }}
                    >
                      {file.name}
                    </Typography>
                  </Button>
                  <br />
                </Fragment>
              ))}
            </Stack>
            <Button
              disabled={!(selectedFiles.length > 0) || uploading}
              variant="outlined"
              style={{
                borderRadius: '50px',
                marginBottom: '30px',
                color: buttonColor,
              }}
              onClick={uploadFiles}
            >
              Upload {uploading ? <CircularProgress size={20} sx={{ marginLeft: '4px' }} /> : null}
            </Button>
          </Stack>
        </div>
        {sharedLink && (
          <div style={{ flex: '1' }}>
            <Stack
              className="container"
              sx={{
                borderRadius: '3px',
                bgcolor: 'white',
                width: {
                  xs: '500px',
                  sm: '350px',
                  md: '450px',
                  lg: '500px',
                },
                minHeight: '350px',
                maxHeight: '600px',
                boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.05)',
                alignItems: 'center',
              }}
            >
              <Share sharedLink={sharedLink} />
            </Stack>
          </div>
        )}
      </div>
      <Snackbar
        open={snackOpen}
        onClose={() => setSnackOpen(false)}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackOpen(false)} severity={severity} sx={{ width: '100%' }}>
          {result.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Upload;
