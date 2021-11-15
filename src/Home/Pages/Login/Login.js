
import { Alert, Button, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

import { NavLink, useHistory, useLocation } from 'react-router-dom';

import CircularProgress from '@mui/material/CircularProgress';
import useAuth from '../Hooks/useAuth';

const Login = () => {
    const [loginData, setLoginData] = useState({})
    const { isLoading, user, authError, Loginuser } = useAuth()
    const history = useHistory();
    const location = useLocation();


    const handleOnchange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newloginData = { ...loginData };
        newloginData[field] = value;
        console.log(field, value, newloginData)
        setLoginData(newloginData)

    }
    const handleLogin = e => {

        Loginuser(loginData.email, loginData.password, location, history)
        e.preventDefault();
    }
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} >
                    <Typography sx={{ mt: 5 }} variant="body1" gutterBottom>
                        Register
                    </Typography>
                    {!isLoading && <form onSubmit={handleLogin}>

                        <TextField sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            name="email"
                            onBlur={handleOnchange}
                            label="Your Email"
                            variant="standard"
                            type="email" /> <br />
                        <TextField sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            name="password"
                            onBlur={handleOnchange}
                            label=" password"
                            type="password"
                            variant="standard" />

                        <br />

                        <Button sx={{ width: '75%', m: 1 }} type="submit" variant="contained">Login</Button>
                        <NavLink style={{ textDecoration: 'none' }} to="/register">
                            <Button variant='text'>New User? Please Register</Button>
                        </NavLink>
                        {isLoading && <CircularProgress />}
                        {user?.email && <Alert severity="success">Login successfully</Alert>}
                        {authError && <Alert severity="error">{authError}</Alert>}
                    </form>}

                </Grid>
                <Grid item xs={12} md={6} sx={{ width: 100, height: 100 }} >
                    <img src="https://thumbs.dreamstime.com/z/login-banner-18483762.jpg" alt="" />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;