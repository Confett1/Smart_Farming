import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Divider } from '@mui/material';
import IconifyIcon from '../../../components/base/IconifyIcon';
import PropTypes from 'prop-types';
import { useState } from 'react';

const menuItems = [
  {
    id: 1,
    title: 'Account Settings',
    icon: 'ic:outline-manage-accounts',
    path: '/profile',
  },
  {
    id: 3,
    title: 'Logout',
    icon: 'ic:baseline-logout',
    path: '/login',
  },
];

const ProfileMenu = ({darkModePref}) => {
  const userProfile = JSON.parse(localStorage.getItem('user'));
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

    const handleMenuItemClick = (path) => {
    if (path === "/login") {
      localStorage.removeItem('user');
      // setUser({ username: '', password: null, userID: '', token: null, role: null, email: null, firstName: null, lastName: null, phoneNumber: null});
    }

    handleProfileMenuClose();
    navigate(path);
  };

  return (
    <>
  <ButtonBase
    sx={{ 
      '&:hover': {
        bgcolor: 'transparent',
        color: '#000'
      }
    }}
    onClick={handleProfileClick}
    aria-controls={open ? 'account-menu' : undefined}
    aria-expanded={open ? 'true' : undefined}
    aria-haspopup="true"
    disableRipple
  >
    <Avatar
      src={userProfile?.userProfile || userProfile}
      sx={{
        height: 44,
        width: 44,
        bgcolor: !darkModePref ? "gray.700" : "gray.200", // Reversed
      }}
    />
  </ButtonBase>

  <Menu
    anchorEl={anchorEl}
    id="account-menu"
    open={open}
    onClose={handleProfileMenuClose}
    onClick={handleProfileMenuClose}
    sx={{
      mt: 1.6,
      '& .MuiList-root': {
        p: 0,
        width: 'auto',
        minWidth: 230,
      },
    }}
    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    PaperProps={{
      sx: {
        borderRadius: 2,
        bgcolor: !darkModePref ? "#1F2937 " : "white", // REVERSED
        color: !darkModePref ? "#E0E0E0" : "text.primary", // REVERSED
        boxShadow: !darkModePref 
          ? "0px 4px 20px rgba(255, 255, 255, 0.1)" 
          : "0px 4px 20px rgba(0, 0, 0, 0.1)",
      },
    }}    
  >
    <Box p={1}>
      <MenuItem 
        onClick={handleProfileMenuClose} 
        sx={{ 
          '&:hover': { borderRadius: 3 },
          display: "flex",
          alignItems: "center",
          gap: 1,
          bgcolor: !darkModePref ? "gray.800" : "white", // Reversed
          color: !darkModePref ? "white" : "black" // Reversed
        }}
      >
        <Avatar 
          src={userProfile?.userProfile || "/default-profile.png"} 
          sx={{ height: 42, width: 42, bgcolor: !darkModePref ? "gray.700" : "gray.200" }} 
        />
        <Stack direction="column">
          <Typography 
            sx={{ 
              textTransform: "capitalize", 
              whiteSpace: "nowrap", 
              overflow: "hidden", 
              textOverflow: "ellipsis",
              color: !darkModePref ? "white" : "black" // Reversed
            }} 
            variant="body2" 
            fontWeight={600}
          >
            {userProfile.firstName} {userProfile.lastName}
          </Typography>
          <Typography 
            variant="caption" 
            fontWeight={400} 
            sx={{ 
              whiteSpace: "nowrap", 
              overflow: "hidden", 
              textOverflow: "ellipsis",
              color: !darkModePref ? "gray.400" : "gray.600" // Reversed
            }}
          >
            {userProfile.email}
          </Typography>
        </Stack>
      </MenuItem>
    </Box>

    <Divider sx={{ my: 0 }} />

    <Box p={1}>
      {menuItems.map((item) => (
        <MenuItem
          key={item.id}
          onClick={() => handleMenuItemClick(item.path)}
          sx={{ 
            py: 1, 
            '&:hover': { borderRadius: 3, bgcolor: !darkModePref ? "gray.700" : "gray.200" }, // Reversed
            bgcolor: !darkModePref ? "gray.800" : "white", // Reversed
            color: !darkModePref ? "white" : "black" // Reversed
          }}
        >
          <ListItemIcon 
            sx={{ 
              mr: 1, 
              color: !darkModePref ? "white" : "text.secondary", // Reversed
              fontSize: 'h5.fontSize' 
            }}
          >
            <IconifyIcon icon={item.icon} />
          </ListItemIcon>
          <Typography 
            variant="body2" 
            fontWeight={500}
            sx={{ color: !darkModePref ? "gray.300" : "text.secondary" }} // Reversed
          >
            {item.title}
          </Typography>
        </MenuItem>
      ))}
    </Box>
  </Menu>
</>

  );
};

ProfileMenu.propTypes = {
  darkModePref: PropTypes.bool.isRequired,
}

export default ProfileMenu;
