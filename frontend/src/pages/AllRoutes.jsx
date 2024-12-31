


import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import  HomePage  from './HomePage'
import  LoginPage  from './LoginPage'
// import { Aspirant } from './Aspirant'
import JobPortal from './JobPortal'
import DocumentManager from './DocumentManager'
import UserProfile from './UserProfile'


export const AllRoutes = () => {
  
  return <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/user-page' element={<JobPortal/>} />
          <Route path='/upload-docs' element={<DocumentManager/>}/>
          <Route path='/profile' element={<UserProfile/>}/>
          <Route path='*' element={<div>404</div>} />
   </Routes>
  
}
