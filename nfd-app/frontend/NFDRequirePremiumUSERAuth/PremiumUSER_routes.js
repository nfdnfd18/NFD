import React from 'react'

const HomePage = React.lazy(() => import('../NFDPages/HomePage.nfd'))
const HomeCars = React.lazy(() => import('../NFDPages/HomeCars.nfd'))
const Register = React.lazy(() => import('../NFDPages/Register&Login/Register.nfd'))
const Login = React.lazy(() => import('../NFDPages/Register&Login/Login.nfd'))
const NFDBlog = React.lazy(() => import('../NFDPages/NFDBlog.nfd'))



const routes = [
  { path: '*', exact: true, name: 'ClinicHome' },








   { path: '/HomePage', name: 'HomePage', element: HomePage },

   { path: '/HomeCars', name: 'HomeCars', element: HomeCars },
  { path: '/Register', name: 'Register', element: Register },
  { path: '/Login', name: 'Login', element: Login },
  { path: '/Blog', name: 'Blog', element: NFDBlog },






  
]

export default routes
