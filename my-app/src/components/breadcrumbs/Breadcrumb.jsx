import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

export default function Breadcrumb({PageName}) {
  return (
    <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
    >
      <Typography 
        color="success"
        fontSize={18}
        fontWeight={630}
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
        }
      }}
    >
      <Link color="success" href="/" >
        Dashboard
      </Link>
      {/* {['Springfield', 'Simpson'].map((item) => (
        <Link key={item} color="success" href="#usage-with-link-and-typography">
          {item}
        </Link>
      ))} */}

      <Typography>{PageName}</Typography>
    </Breadcrumbs>
    </Box>
  );
}

Breadcrumb.propTypes = {
  PageName: PropTypes.string.isRequired,
}