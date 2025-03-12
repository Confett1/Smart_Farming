import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function LinearLoader() {
  const darkModePref = JSON.parse(localStorage.getItem("darkmode"));
  return (
    <Box 
    sx={{
      backgroundColor: darkModePref ? "white" : "#374151",
      paddingTop:"0.2",
      height: "100vh"
    }}>
      
      <LinearProgress 
        sx={{
          height: '6px', // Adjust height for better visibility
          borderRadius: '100px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)', // Subtle transparent background
          '& .MuiLinearProgress-bar': {
            backgroundImage: darkModePref ? "linear-gradient(to right, #4caf50,rgb(30, 255, 0))" : "linear-gradient(to right,rgb(106, 113, 219),rgb(177, 151, 240))", // Green gradient
          },
        }} 
      />
    </Box>
  );
}
