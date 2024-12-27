import React from 'react'
import { useAuth } from '../context/authContext'
import {Navigate} from 'react-router-dom'

const PrivateRoutes = ({children}) => {//children: Represents the components (or routes) wrapped by RoleBaseRoutes.its used in App.jsx
  const {user, loading} = useAuth()

  if(loading) {
    return <div>Loading ....</div>
  }

  return user ? children : <Navigate to="/login" />//if user existes display(go to) the children ex:   </Admin>willbe displayed
}                                 //this line of code is considered protecting the route since"user" is created(exists) by setUser(response.data.user) after sending token to backend and verifing it there then if 
/*it does the user will be created by this code : const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(
            "http://localhost:5000/api/auth/verify",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.success) {
            setUser(response.data.user);
          }
*/
export default PrivateRoutes