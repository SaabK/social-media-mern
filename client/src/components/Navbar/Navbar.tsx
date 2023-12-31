import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import memories from '../../assets/memories.png';
import { AppDispatch, RootState } from '../../store/store';
import useStyles from './styles';
import { logout } from '../../features/auth/authThunk';
import { useEffect } from 'react';
import decode, { JwtPayload } from 'jwt-decode';

function Navbar() {

  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { auth: { authData: user } } = useSelector((state: RootState) => state);


  const handleLogout = () => {
    dispatch(logout());

    navigate('/auth');
  }

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode<JwtPayload>(token);

      if (decodedToken.exp as number * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
  }, [])

  // if (user === undefined || user === null || Object.keys(user).length === 0) {
  // }

  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
      <div className={classes.brandContainer}>
        <Typography component={Link} to='/' className={classes.heading} variant='h2' align='center'>Memories</Typography>

        <img className={classes.image} src={memories} alt="Memories" height='60' />
      </div>
      <Toolbar className={classes.toolbar}>
        {
          user ? (
            <div className={classes.profile}>
              <Avatar className={classes.purple} alt={user?.data.name} src={user?.data.picture}>{user?.data.name.charAt(0)}</Avatar>
              <Typography className={classes.userName} variant='h6'>{user?.data.name}</Typography>
              <Button variant="contained" className={classes.logout} onClick={handleLogout} color='secondary'>Logout</Button>
            </div>
          ) : (
            <Button component={Link} to="/auth" variant='contained' color='primary'>Login</Button>
          )
        }
      </Toolbar>
    </AppBar>
  )
}

export default Navbar