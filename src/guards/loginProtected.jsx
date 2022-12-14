import React, { useEffect } from 'react'
import { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import Login from '../components/Login'
import Login2 from '../components/Login'
import { isValidToken } from '../utils/jwt'



const LoginProtected = ({children}) => {

    const token=window.localStorage.getItem("token")

    const [location, setLocation] = useState(null)
    
    const { pathname } = useLocation()


  

    if (!token || !isValidToken(token)){
        if (pathname !== location) setLocation(pathname)
        return <Login2/>
    }

    if (location && pathname !== location) {
        setLocation(null)
        return <Navigate to={location} replace />
      }
    
      return <>{children}</>

}

export default LoginProtected