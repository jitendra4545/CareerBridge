


import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import  HomePage  from './HomePage'
import  LoginPage  from './LoginPage'
// import { Aspirant } from './Aspirant'
import JobPortal from './JobPortal'
import DocumentManager from './DocumentManager'
import UserProfile from './UserProfile'
import JobDetailsCard from '../components/JobDetailsCard'
import { RequiredAuth } from './RequiredAuth'


export const AllRoutes = () => {
  
  return <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/user-page' element={<RequiredAuth><JobPortal/></RequiredAuth>} />
          <Route path='/upload-docs' element={<RequiredAuth><DocumentManager/></RequiredAuth>}/>
          <Route path='/profile' element={<RequiredAuth><UserProfile/></RequiredAuth>}/>
          <Route path='*' element={<div>404</div>} />
          <Route path='/job-details/:id' element={<RequiredAuth><JobDetailsCard/></RequiredAuth>} />
   </Routes>
  
}
