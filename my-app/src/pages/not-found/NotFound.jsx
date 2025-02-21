import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);  // This will go back to the previous page
  };

  return (
    <Box sx={{ textAlign: 'center', padding: '50px', mt: 15 }}>
        <Typography variant='body' fontSize={12}>OOPS! PAGE NOT FOUND</Typography>
      <Typography variant="h1" fontWeight={1000} letterSpacing={-3} ml={-2} sx={{ textShadow: '10px 5px 2px rgba(0,0,0,0.4)', mt: -2.2}}>
        404
      </Typography>
      <Typography variant="body" fontSize={12} textTransform={'uppercase'}>
        We are sorry, but the page you requested was not found
      </Typography>
      <br />
      <Button variant="contained" onClick={goBack} sx={{fontSize: 10, borderRadius: 10, my: 1}}>
        Go Back
      </Button>
    </Box>
  );
};

export default NotFound;










// const NotFound = () => {
//   return (
//     <div style={{ textAlign: 'center', marginTop: '100px', position: 'relative' }}>
//       <h1
//         style={{
//           fontSize: '100px',
//           fontWeight: 'bold',
//           color: 'black',
//           position: 'absolute',
//           animation: 'moveLayer 2s ease-in-out infinite',
//         }}
//       >
//         SMART FARMING
//       </h1>
//       <h1
//         style={{
//           fontSize: '100px',
//           fontWeight: 'bold',
//           color: 'red',
//           position: 'absolute',
//           animation: 'moveLayer 2s ease-in-out 0.5s infinite', // Delay for the second layer
//         }}
//       >
//         SMART FARMING
//       </h1>
//       <h1
//         style={{
//           fontSize: '100px',
//           fontWeight: 'bold',
//           color: 'blue',
//           position: 'absolute',
//           animation: 'moveLayer 2s ease-in-out 1s infinite', // Delay for the third layer
//         }}
//       >
//         SMART FARMING
//       </h1>

//       <style>
//         {`
//           @keyframes moveLayer {
//             0% {
//               transform: translate(0, 0);
//             }
//             50% {
//               transform: translate(10px, 10px);
//             }
//             100% {
//               transform: translate(0, 0);
//             }
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default NotFound;
