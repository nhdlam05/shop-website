'use client'
import { Box, useTheme } from '@mui/material'
import { NextPage } from 'next'
import LoginPage from 'src/view/pages/login'

type TProps = {}

const Login: NextPage<TProps> = () => {
  const theme = useTheme()
  return <LoginPage />
}
export default Login
