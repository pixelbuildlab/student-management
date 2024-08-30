import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import useInput from '../hooks/useInput'
import {
  validateEmailInput,
  validateNameCityInput,
  validatePasswordInput,
} from '../utils/validationProvider'
import axios from 'axios'
import { useRouter } from 'next/router'
import Spinner from './Spinner/Spinner'
import useAuthProvider from '../hooks/authProvider/useAuthProvider'
import Head from 'next/head'
import { Copyright } from './SigninUi'

export default function Register() {
  const router = useRouter()
  const { isAuth, jsonAuthData } = useAuthProvider('userData', false)
  if (isAuth || jsonAuthData) {
    router.push('/dashboard')
  }
  const email = useInput('', validateEmailInput)
  const username = useInput('', (v) => '')
  const password = useInput('', validatePasswordInput)
  const [authError, setAuthError] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)

  const [isFilled, setIsFilled] = React.useState({
    email: false,
    password: false,
    username: false,
  })
  // console.log(localStorage.getItem("userData"));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    setIsLoading(true)

    const userData = {
      email: data.get('email'),
      password: data.get('password'),
      username: data.get('username'),
    }

    try {
      const resp = await axios.post(
        `${process.env.API_URL}/user/register`,
        userData,
        {
          withCredentials: true,
        }
      )
      console.log('res[', resp)

      if (resp.status === 201) {
        localStorage.setItem('userData', JSON.stringify(resp.data))
        router.push('/dashboard')
      }
    } catch (error: any) {
      console.log(error)
      setAuthError(error?.response?.data?.message)
      setIsLoading(false)
    }
  }

  const validateForm = () => {
    return (
      email.error.length !== 0 ||
      password.error.length !== 0 ||
      username.error.length !== 0
    )
  }

  const isFormValid = validateForm()

  if (isLoading) {
    return <Spinner state={true} />
  }
  return (
    <>
      <Head>
        <title>Student Management Login</title>
        <meta
          property='og:title'
          content='Student Management Login'
          key='title'
        />
      </Head>
      <Grid
        container
        component='main'
        sx={{ height: '100vh' }}
      >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              component='h1'
              variant='h5'
            >
              Register
            </Typography>
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <Typography
                component='h1'
                variant='caption'
                sx={{ textAlign: 'center', color: 'red' }}
              >
                {authError}
              </Typography>
              <TextField
                error={email.error !== ''}
                helperText={email.error}
                onBlur={(e) => {
                  if (e.target.value.length !== 0) {
                    setIsFilled({ ...isFilled, email: true })
                  }
                }}
                value={email.value}
                onChange={email.onChange}
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                autoFocus
              />
              <TextField
                error={username.error !== ''}
                helperText={username.error}
                onBlur={(e) => {
                  if (e.target.value.length !== 0) {
                    setIsFilled({ ...isFilled, username: true })
                  }
                }}
                value={username.value}
                onChange={username.onChange}
                margin='normal'
                required
                fullWidth
                id='username'
                label='Username'
                name='username'
                autoComplete='username'
                autoFocus
              />
              <TextField
                margin='normal'
                required
                fullWidth
                error={password.error !== ''}
                helperText={password.error}
                onBlur={(e) => {
                  if (e.target.value.length !== 0) {
                    setIsFilled({ ...isFilled, password: true })
                  }
                }}
                value={password.value}
                onChange={password.onChange}
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
                disabled
              /> */}
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
                disabled={!isFilled.email || !isFilled.password || isFormValid}
              >
                Register
              </Button>
              <Grid container>
                <Grid
                  item
                  xs
                >
                  <Link
                    href='#'
                    variant='body2'
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    href='/login'
                    variant='body2'
                  >
                    {'Already have an account? Login'}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
