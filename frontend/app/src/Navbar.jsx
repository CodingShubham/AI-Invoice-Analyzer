import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import axios from "axios"

import { useNavigate, useLocation } from 'react-router-dom';


const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


function Navbar({toggleMenu,settoggleMenu}) {
  
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate=useNavigate();
  const location=useLocation();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSettingClick=async(setting)=>{

    try{
      handleCloseUserMenu();

      if(setting=="Logout"){

        axios.post("http://localhost:3000/logout",{withCredentials:true})
        // settoggleMenu(false);
        navigate("/login");
      }
       

    }


    catch(err){

      console.error(err)

    }
  }

  

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* Logo */}
          <AdbIcon sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            component="a"
            href="#"
            sx={{
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Invoice Analyser
          </Typography>

          {/* Push avatar to right */}
         { location.pathname !== "/login" &&  <Box sx={{ ml: 'auto' }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User" />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: '45px' }}
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={()=>handleSettingClick(setting)}>
                  {setting}
                </MenuItem>
              ))}
            </Menu>
          </Box>}

        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;