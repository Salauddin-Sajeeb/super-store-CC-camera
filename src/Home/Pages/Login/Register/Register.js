
import { Alert, Button, CircularProgress, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

import { NavLink, useHistory } from 'react-router-dom';



import useAuth from '../../Hooks/useAuth';

const Register = () => {
    const [loginData, setLoginData] = useState({})
    const { user, RegisterUser, SignInGoogle, authError } = useAuth()
    const history = useHistory();

    const handleOnchange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newloginData = { ...loginData };
        newloginData[field] = value;
        console.log(field, value, newloginData)
        setLoginData(newloginData)

    }

    const handleGoogle = () => {
        SignInGoogle();
    }
    const handleRegister = e => {

        RegisterUser(loginData.email, loginData.password, loginData.name, history);

        e.preventDefault();
    }

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} >
                    <Typography sx={{ mt: 5 }} variant="body1" gutterBottom>
                        Register
                    </Typography>
                    <form onSubmit={handleRegister}>
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            label="Your Name"
                            name="name"
                            onBlur={handleOnchange}
                            variant="standard" />
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
                        <TextField sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            name="password2"
                            onBlur={handleOnchange}
                            label="Re-type- password"
                            type="password"
                            variant="standard" />
                        <br />

                        <Button sx={{ width: '75%', m: 1 }} type="submit" variant="contained">Register</Button>
                        <NavLink style={{ textDecoration: 'none' }} to="/login">
                            <Button variant='text'>Already Register? Please Login</Button>
                        </NavLink>


                    </form>

                    {user?.email && <Alert severity="success">User Created successfully!</Alert>}
                    {authError && <Alert severity="error">{authError}</Alert>}
                    <Button onClick={handleGoogle} variant="contained">Google Sign In</Button>
                </Grid>
                <Grid item xs={12} md={6} >
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSOtP1Wip6z4qpVRmuqjEz4_dBqRc2bdC9Gg&usqp=CAU" alt="" />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Register;