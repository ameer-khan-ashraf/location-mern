import React, {useState,useEffect} from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom';
import {AppBar, Button, Toolbar, Typography, Avatar} from '@material-ui/core';
import memories from '../../images/logo.png'
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import decode from 'jwt-decode'

const NavBar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const dispatch = useDispatch();
    const history = useHistory();

    const location = useLocation();
    const logout = () => {
        dispatch({type: 'LOGOUT'});

        history.push('/')
        setUser(null);
    }
    useEffect(()=>{
        const token = user.token;
        if (token){
            const decodedToken = decode(token);
            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    },[location])
  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
        <div className={classes.brandContianer}>
            <Typography component={Link} to='/' className={classes.heading} variant="h2" align="center" >Memories</Typography>
            <img className={classes.image} src={memories} alt="memories" height="60"/>
        </div>
        <Toolbar className={classes.toolbar}>
            {user ? (
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                    <Button variant="contained" className={classes.logout} onClick={logout} color="secondary">Logout</Button>
                </div>
            ):(
                <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
            )}
        </Toolbar>
    </AppBar>
  )
}

export default NavBar