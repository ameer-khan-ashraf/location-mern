import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import {GoogleLogin} from 'react-google-login';
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';

import Icon from './icon'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles';
import Input from './Input'
import {signin, signup} from '../../actions/auth';

const initialState = { firstName:'', lastName:'', email:'', password:'', confirmPassword:''};

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleShowPassword = () => setShowPassword(!showPassword)

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(isSignup){
            dispatch(signup(formData,history))
        }else{
            dispatch(signin(formData,history))
        }
    }

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const switchMode = () =>{
        setIsSignUp(!isSignup);
        setShowPassword(false);
    }

    const googleSuccess = async (res) =>{
        const result = res.profileObj;
        const token = res.tokenId;
        try{
            dispatch({type: 'AUTH', data:{result, token}});
            history.push('/');
        } catch (error){
            console.log(error)
        }
    }

    const googleFailure = (err) =>{
        console.log(err);
        console.log("Google Sign In was unsucessful. Try Again Later");
    }


    return (
        <Container component='main' maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography variant="h5" color="initial"> {isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input
                                        name = 'firstName'
                                        label="First Name"
                                        handleChange={handleChange}
                                        autoFocus
                                        half
                                    />
                                    <Input
                                        name = 'lastName'
                                        label="Last Name"
                                        handleChange={handleChange}
                                        half
                                    />
                                </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword?"text":"password"} handleShowPassword={handleShowPassword}/>
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="Password"/>}
                    </Grid>
                    <Button type='submit' fullWidth variant="contained" color="primary" className={classes.submit}>
                                {isSignup? 'Sign Up':'Sign In'}
                    </Button>
                    <GoogleLogin
                        clientId="1099260393008-b9asftc7oalkh10r8h24i40vqbr28lpv.apps.googleusercontent.com"
                        render={(renderProps)=>(
                            <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">Google Sign In</Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid item>
                        <Button onClick = {switchMode}>
                            {isSignup? 'Already have an account? Sign In': "Dont have an account? Sign Up"}
                        </Button>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth