


import React from 'react'
import { Navigate } from 'react-router-dom'

export const RequiredAuth = ({children}) => {
  
    let token=(localStorage.getItem("token"))
console.log("req auth",token)
    if(token==null){
    
      return  <Navigate to='/' />
    }
    
    return children
}
