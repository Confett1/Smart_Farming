// import React from 'react';

// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Box from '@mui/material/Box';
// import Menu from '@mui/material/Menu';
// import Stack from '@mui/material/Stack';
// import Avatar from '@mui/material/Avatar';
// import MenuItem from '@mui/material/MenuItem';
// import Typography from '@mui/material/Typography';
// import ButtonBase from '@mui/material/ButtonBase';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ProfileImage from '../../../assets/user-profile.jpg';
// import { Divider } from '@mui/material';
// import IconifyIcon from '../../../components/base/IconifyIcon';
// // import { useUserContext } from 'contexts/UserContext';
// // import paths from 'routes/paths';


// const menuItems = [
//   {
//     id: 1,
//     title: 'Account Settings',
//     icon: 'ic:outline-manage-accounts',
//     path: '/account-settings',
//   },
//   {
//     id: 3,
//     title: 'Logout',
//     icon: 'ic:baseline-logout',
//     path: '/',
//   },
// ];

// const ProfileMenu = () => {
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const open = Boolean(anchorEl);
//   // const { user, setUser } = useUserContext();
//   const navigate = useNavigate();

//   const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleProfileMenuClose = () => {
//     setAnchorEl(null);
//   };

//   // const handleMenuItemClick = (path: string) => {
//   //   if (path === paths.signin) {
//   //     localStorage.clear();
//   //     setUser({ username: '', password: null, userID: '', token: null, role: null, email: null, firstName: null, lastName: null, phoneNumber: null});
//   //   }

//   //   handleProfileMenuClose();
//   //   navigate(path);
//   // };

//   return (
//     <>
//       <ButtonBase
//         sx={{ ml: 1 }}
//         onClick={handleProfileClick}
//         aria-controls={open ? 'account-menu' : undefined}
//         aria-expanded={open ? 'true' : undefined}
//         aria-haspopup="true"
//         disableRipple
//       >
//         <Avatar
//           src={ProfileImage}
//           sx={{
//             height: 44,
//             width: 44,
//             bgcolor: 'primary.main',
//           }}
//         />
//       </ButtonBase>

//       <Menu
//         anchorEl={anchorEl}
//         id="account-menu"
//         open={open}
//         onClose={handleProfileMenuClose}
//         onClick={handleProfileMenuClose}
//         sx={{
//           mt: 1.5,
//           '& .MuiList-root': {
//             p: 0,
//             width: 'auto',            
//             minWidth: 230,
//           },
//         }}
//         transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//         anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//       >
//         <Box p={1}>
//           <MenuItem onClick={handleProfileMenuClose} sx={{ '&:hover': { bgcolor: 'info.dark' } }}>
//             <Avatar src={ProfileImage} sx={{ mr: 1, height: 42, width: 42 }} />
//             <Stack direction="column">
//               <Typography variant="body2" color="text.primary" fontWeight={600}>
//                 {/* {user.firstName + ' ' + user.lastName} */}

//                 MAIN ADMIN
//               </Typography>
//               <Typography variant="caption" color="text.secondary" fontWeight={400}>
//                 {/* {user.email} */}
//                 johndoe@gmail.com
//               </Typography>
//             </Stack>
//           </MenuItem>
//         </Box>

//         <Divider sx={{ my: 0 }} />

//         <Box p={1}>
//           {menuItems.map((item) => (
//             <MenuItem
//               key={item.id}
//               // onClick={() => handleMenuItemClick(item.path)}
//               sx={{ py: 1 }}
//             >
//               <ListItemIcon sx={{ mr: 1, color: 'text.secondary', fontSize: 'h5.fontSize' }}>
//                 <IconifyIcon icon={item.icon} />
//               </ListItemIcon>
//               <Typography variant="body2" color="text.secondary" fontWeight={500}>
//                 {item.title}
//               </Typography>
//             </MenuItem>
//           ))}
//         </Box>
//       </Menu>
//     </>
//   );
// };

// export default ProfileMenu;








import React, { useState } from 'react';
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

const menuItems = [
  {
    id: 1,
    title: 'Account Settings',
    icon: 'ic:outline-manage-accounts',
    path: '/settings',
  },
  {
    id: 3,
    title: 'Logout',
    icon: 'ic:baseline-logout',
    path: '/login',
  },
];

const ProfileMenu = ( {ProfileImage} ) => {
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
      localStorage.clear();
      // setUser({ username: '', password: null, userID: '', token: null, role: null, email: null, firstName: null, lastName: null, phoneNumber: null});
    }

    handleProfileMenuClose();
    navigate(path);
  };

  return (
    <>
      <ButtonBase
        sx={{ ml: 1 }}
        onClick={handleProfileClick}
        aria-controls={open ? 'account-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        disableRipple
      >
        <Avatar
          src={ProfileImage}
          sx={{
            height: 44,
            width: 44,
            bgcolor: 'primary.main',
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
          mt: 1.5,
          '& .MuiList-root': {
            p: 0,
            width: 'auto',
            minWidth: 230,
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box p={1}>
          <MenuItem onClick={handleProfileMenuClose} sx={{ '&:hover': { bgcolor: 'info.dark' } }}>
            <Avatar src={ProfileImage} sx={{ mr: 1, height: 42, width: 42 }} />
            <Stack direction="column">
              <Typography variant="body2" color="text.primary" fontWeight={600}>
                MAIN ADMIN
              </Typography>
              <Typography variant="caption" color="text.secondary" fontWeight={400}>
                johndoe@gmail.com
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
              sx={{ py: 1 }}
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

export default ProfileMenu;
