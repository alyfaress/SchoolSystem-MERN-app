import React from 'react'
import { useAuth } from '../context/authContext'
import { Navigate } from 'react-router-dom'

const RoleBaseRoutes = ({children, requiredRole}) => {//"requiredRole": A parameter specifying the role(s) allowed to access the wrapped components. It is expected to be an array of roles.
    const {user, loading} = useAuth()

    if(loading) {
        return <div>Loading ...</div>
    }

    if(!requiredRole.includes(user.role)) {//this is what makes specific user access this route,it Checks if the user's role (from user.role) is not included in the requiredRole array.
        alert("ok");
       <Navigate to="/unauthorized"/> 
    }
  
    return user ? children : <Navigate to="/login" />//the Role is checked before checking if user exists
}

export default RoleBaseRoutes
