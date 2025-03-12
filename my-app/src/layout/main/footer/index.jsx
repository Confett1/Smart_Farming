import Typography from '@mui/material/Typography';

const Footer = () => {
  const darkModePref = JSON.parse(localStorage.getItem('darkmode'));
  return (
    <Typography
      mt={0.5}
      px={1}
      py={3}
      color={darkModePref ? "black" : "white"}
      variant="body2"
      sx={{ textAlign: { xs: 'center', md: 'right' } }}
      letterSpacing={0.5}
      fontWeight={500}
    >
      Copyright {new Date().getFullYear()}. All Rights Reserved.
    </Typography>
  );
};

export default Footer;
