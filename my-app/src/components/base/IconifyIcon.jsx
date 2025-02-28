import { Box } from '@mui/material';
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';

const IconifyIcon = ({ icon, ...rest }) => {
  return <Box component={Icon} icon={icon} {...rest} />;
};

IconifyIcon.propTypes = {
  icon: PropTypes.any.isRequired,
}

export default IconifyIcon;
