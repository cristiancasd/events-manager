import { Avatar, Box, Divider, Grid, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../store/auth/thunks';

export const UserMenu = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [anchorElUser, setAnchorElUser] = useState(null);

  ////console.log('on UserMenu component', user)
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    dispatch(startLogout());
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
      <Typography variant="body1" sx={{ mr: 1 }}>
        {user && user.name}
      </Typography>
      <Tooltip title={user ? 'Open settings' : ''}>
        <IconButton onClick={user && handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src={user && user.image} />
        </IconButton>
      </Tooltip>
      {user && (
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <Typography textAlign="right" paddingRight={2}>
            {user.commerceName}
          </Typography>
          <Typography textAlign="right" paddingRight={2} gutterBottom sx={{ p: 1 }}>
            {user.userName}
          </Typography>
          <Divider />

          <MenuItem key="logout" onClick={logout}>
            <Typography width={'100%'} textAlign="center" gutterBottom sx={{ width: 200 }}>
              Logout
            </Typography>
          </MenuItem>
        </Menu>
      )}
    </Box>
  );
};
