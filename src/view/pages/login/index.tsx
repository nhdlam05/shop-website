'use client'

// ** Mui Imports
import {
  Box,
  CssBaseline,
  Container,
  Typography,
  Button,
  Link,
  useTheme,
} from '@mui/material'

// ** Next Imports
import { NextPage } from 'next'
import TextInput from 'src/components/text-field/TextInput'
import FormContainer from 'src/components/container'
import * as yup from 'yup';


type TProps = {}

const LoginPage: NextPage<TProps> = () => {
  const theme = useTheme()
  const schema = yup.object().shape({
      email: yup.string().email().required(),
  })
    const onSubmit = (formData: any) => {
    console.log('email: ', formData.email)
    console.log('password: ', formData.password)
  }
  return (
    <>
      <Container component='main' sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }} maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <FormContainer
            onSubmit={onSubmit}
            schema={schema}
            inputs = {
              [
                {
                  name: 'email',
                  ele: (props: any) =>
                      <>
                        <TextInput
                            {...props}
                            margin='normal'
                            required
                            fullWidth
                            id='email'
                            label='Email Address'
                            autoComplete='email'
                            autoFocus
                        />
                      </>
                },
                  {
                      name: 'password',
                      ele: (props: any) =>
                          <>
                            <TextInput
                                {...props}
                                required
                                fullWidth
                                label='Password'
                                type='password'
                                autoComplete='current-password'
                            />
                              <Button type='submit' fullWidth variant='contained' sx={{ mt: 10, mb: 2 }}>Login</Button>
                          </>
                  }
              ]
            }
          />
                <Link href='#' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Link>
        </Box>
      </Container>
    </>
  )
}
export default LoginPage
