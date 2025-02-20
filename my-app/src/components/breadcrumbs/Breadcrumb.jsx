import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';

export default function Breadcrumb() {
  return (
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
      <Link color="primary" href="/" >
        Dashboard
      </Link>
      {['Springfield', 'Simpson'].map((item) => (
        <Link key={item} color="success" href="#usage-with-link-and-typography">
          {item}
        </Link>
      ))}

      <Typography>Dashboard</Typography>
    </Breadcrumbs>
  );
}
