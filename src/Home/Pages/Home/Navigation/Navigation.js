import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';


const Navigation = () => {
    const { user, logOut } = useAuth()
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
                        {user.displayName}
                    </Typography>
                    <Link to="/">
                        <Button style={{ textDecoration: 'none', color: 'white' }} color='inherit'>home</Button>
                    </Link>
                    <Link to="/explore">
                        <Button style={{ textDecoration: 'none', color: 'white' }} color='inherit'>All PAckages</Button>
                    </Link>
                    {
                        user?.email ?
                            <Box>

                                <NavLink to="/dashboard">
                                    <Button style={{ textDecoration: 'none', color: 'white', }} color="inherit">Dashboard</Button>
                                </NavLink>
                                <Button onClick={logOut} color="inherit">Log Out</Button>
                                <Button color="inherit">{user.displayName}</Button>

                            </Box> :

                            <NavLink to="/login">
                                <Button style={{ textDecoration: 'none', color: 'white' }} color="inherit">Login</Button>
                            </NavLink>

                    }

                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navigation;