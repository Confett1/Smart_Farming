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

const ProfileMenu = () => {
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
            bgcolor: '',
          }}
        />
       {/* <Typography sx={{textTransform: "capitalize"}} variant='body2' pl={1}>{userProfile.firstName} {userProfile.middleName} {userProfile.lastName} {userProfile.suffix}</Typography> */}
       {/* <IconifyIcon sx={{ fontSize: 30, ml: -0.6 }} icon={open ? 'material-symbols-light:arrow-drop-up-rounded' : 'material-symbols-light:arrow-drop-down-rounded'} /> */}
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
            borderRadius: 2, // Apply border radius here
          },
        }}
      >
        <Box p={1}>
          <MenuItem onClick={handleProfileMenuClose} sx={{ '&:hover': { borderRadius: 3 } }}>
            <Avatar src={userProfile?.userProfile ? userProfile.userProfile : userProfile} sx={{ mr: 1, height: 42, width: 42 }} />
            <Stack direction="column">
              <Typography sx={{textTransform: "capitalize"}} variant="body2" color="text.primary" fontWeight={600}>
                {userProfile.firstName} {userProfile.lastName}
              </Typography>
              <Typography variant="caption" color="text.secondary" fontWeight={400}>
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
              sx={{ py: 1 , '&:hover': { borderRadius: 3 } }}
            >
              <ListItemIcon sx={{ mr: 1, color: 'text.secondary', fontSize: 'h5.fontSize' }}>
                <IconifyIcon icon={item.icon} />
              </ListItemIcon>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
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
  userProfile: PropTypes.any.isRequired
}

export default ProfileMenu;
