import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

export default function Breadcrumb({PageName}) {
  const darkModePref = JSON.parse(localStorage.getItem('darkmode'));
  
  return (
    <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
    >
      <Typography 
        sx={{
          color: darkModePref ? "green" : "white"
        }}
        fontSize={17}
        fontWeight={500}
      >
        {PageName}
      </Typography>

    <Breadcrumbs 
      separator="›" 
      aria-label="breadcrumbs"
      
      sx={{
        fontSize: {
          xs: 12,
          sm: 16
        },  
      }}
    >
      <Link sx={{
        color: darkModePref? "green" : "white"
      }} href="/" >
        Dashboard
      </Link>
      {/* {['Springfield', 'Simpson'].map((item) => (
        <Link key={item} color="success" href="#usage-with-link-and-typography">
          {item}
        </Link>
      ))} */}

      <Typography className={`${darkModePref ? "text-gray-600" : "text-gray-200"}`}>{PageName}</Typography>
    </Breadcrumbs>
    </Box>
  );
}

Breadcrumb.propTypes = {
  PageName: PropTypes.string.isRequired,
}