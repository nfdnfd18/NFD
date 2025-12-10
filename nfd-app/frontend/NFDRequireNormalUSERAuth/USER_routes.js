import React from 'react'

const UserHomePage = React.lazy(() => import('./USERPages/UserHomePage.nfd'))
const MyBooking = React.lazy(() => import('./USERPages/MyBooking.nfd'))
const MyProfile = React.lazy(() => import('./USERPages/MyProfile.nfd'))
const MySupport = React.lazy(() => import('./USERPages/MySupport.nfd'))
const UserBlog = React.lazy(() => import('./USERPages/UserBlog.nfd'))

const UserFreinds = React.lazy(() => import('./USERPages/UserFreinds.nfd'))
const UserLive = React.lazy(() => import('./USERPages/UserLive.nfd'))


const routes = [
  { path: '*', exact: true, name: 'NormalUser' },








   { path: '/UserHomePage', name: 'UserHomePage', element: UserHomePage },

   { path: '/MyBooking', name: 'MyBooking', element: MyBooking },
  { path: '/MyProfile', name: 'MyProfile', element: MyProfile },
  { path: '/MySupport', name: 'MySupport', element: MySupport },
  { path: '/UserBlog', name: 'UserBlog', element: UserBlog },

  { path: '/UserFreinds', name: 'UserFreinds', element: UserFreinds },
  { path: '/UserLive', name: 'UserLive', element: UserLive },





  
]

export default routes
