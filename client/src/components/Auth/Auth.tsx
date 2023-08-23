import { Avatar, Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import { useState } from 'react';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { login } from '../../features/auth/authThunk';
import { AppDispatch } from '../../store/store';
import { useNavigate } from 'react-router-dom'

function Auth() {

  const classes = useStyles();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [hasSignedUp, setHasSignedUp] = useState(false)

  const dispatch = useDispatch<AppDispatch>()

  const handleSubmit = () => {

  }

  const handleChange = () => {

  }

  const googleSuccess = async (res: CredentialResponse) => {
    const token = res.credential;

    try {
      if (token) {
        dispatch(login({ token }));
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const googleFailure = () => {
    console.log("Google Sign In Errors: ");
  };

  const switchMode = () => {
    setHasSignedUp(prev => !prev);
    setShowPassword(false);
  }


  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>
          {hasSignedUp ? 'Sign In' : 'Sign Up'}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {
              !hasSignedUp && (
                <>
                  <Input name='firstName' label="First Name" handleChange={handleChange} type='' half />

                  <Input name='firstName' label="First Name" handleChange={handleChange} type='' half />
                </>
              )
            }
            <Input name='email' label='Email Address' handleChange={handleChange} type='email' />

            <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handlePassword={() => setShowPassword(prev => !prev)} />

            {
              !hasSignedUp && (<Input name='confirmPassword' label='Repeat Password' type='password' handleChange={handleChange} />)
            }
          </Grid>

          <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
            {
              hasSignedUp ? 'Sign In' : 'Sign Up'
            }
          </Button>

          <GoogleLogin
            onSuccess={googleSuccess}
            onError={googleFailure}
          />

          <Grid container justifyContent='space-around'>
            <Grid item>
              <Button onClick={switchMode}>
                {
                  hasSignedUp ? 'Don\'t have an account? Sign Up' : 'Already have an account? Sign In'
                }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth