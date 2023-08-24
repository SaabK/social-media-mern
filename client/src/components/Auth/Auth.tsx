import { Avatar, Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import { useState } from 'react';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { login, signin, signup } from '../../features/auth/authThunk';
import { AppDispatch } from '../../store/store';
import { useNavigate } from 'react-router-dom'
import { IFormData } from '../../types';

function Auth() {

  const classes = useStyles();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [hasSignedUp, setHasSignedUp] = useState(false);
  const [formData, setFormData] = useState<IFormData>({
    firstName: '', lastName: '', email: '', password: '', confirmPassword: ''
  });

  const dispatch = useDispatch<AppDispatch>()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!hasSignedUp) {
      dispatch(signup({ formData, navigate }));
    } else {
      dispatch(signin({ formData, navigate }));
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
          <Grid container spacing={2}>
            {
              !hasSignedUp && (
                <>
                  <Input name='firstName' label="First Name" handleChange={(e) => handleChange(e)} type='text' half />

                  <Input name='lastName' label="Last Name" handleChange={(e) => handleChange(e)} type='text' half />
                </>
              )
            }
            <Input name='email' label='Email Address' handleChange={(e) => handleChange(e)} type='email' />

            <Input name='password' label='Password' handleChange={(e) => handleChange(e)} type={showPassword ? 'text' : 'password'} handlePassword={() => setShowPassword(prev => !prev)} />

            {
              !hasSignedUp && (<Input name='confirmPassword' label='Repeat Password' type='password' handleChange={(e) => handleChange(e)} />)
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