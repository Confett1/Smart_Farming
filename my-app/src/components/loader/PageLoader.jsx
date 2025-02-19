import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

// Gradient Circular Progress Component
function GradientCircularProgress() {
  return (
    <React.Fragment>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e01cd5" />
            <stop offset="100%" stopColor="#1CB5E0" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress 
        sx={{
          'svg circle': {
            stroke: 'url(#my_gradient)' // Applying the gradient to the progress circle
          }
        }}
      />
    </React.Fragment>
  );
}

// Page Loader Component
export default function PageLoader() {
  return (
    <Stack 
      spacing={2}
      sx={{ 
        height: '80vh', 
        width: '100vw', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginLeft: '7.3rem',
        overflow: 'hidden',
      }}
    >
      <GradientCircularProgress />
    </Stack>
  );
}