import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function LinearLoader() {
  return (
    <Box>
      
      <LinearProgress 
        sx={{
          '& .MuiLinearProgress-bar': {
            backgroundImage: 'linear-gradient(to right, #4caf50, #81c784)', // Green gradient
          },
        }} 
      />
    </Box>
  );
}
