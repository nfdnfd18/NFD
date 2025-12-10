import React from 'react'

const HomePage = React.lazy(() => import('../NFDPages/HomePage.nfd'))
const HomeCars = React.lazy(() => import('../NFDPages/HomeCars.nfd'))
const Register = React.lazy(() => import('../NFDPages/Register&Login/Register.nfd'))
const Login = React.lazy(() => import('../NFDPages/Register&Login/Login.nfd'))
const NFDBlog = React.lazy(() => import('../NFDPages/NFDBlog.nfd'))

const nfdcopy = React.lazy(() => import('../nfdcopy.nfd'))
const removebgN = React.lazy(() => import('../removebgN/removebgN.nfd'))


const routes = [



 




   { path: '/HomePage', name: 'HomePage', element: HomePage },

   { path: '/HomeCars', name: 'HomeCars', element: HomeCars },
  { path: '/Register', name: 'Register', element: Register },
  { path: '/Login', name: 'Login', element: Login },
  { path: '/Blog', name: 'Blog', element: NFDBlog },

  { path: '/nfdcopy', name: 'nfdcopy', element: nfdcopy },
  { path: '/removebgN', name: 'removebgN', element: removebgN },





  
]

export default routes
