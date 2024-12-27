import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const userContext = createContext();//FIRST CREATE THE context and store it in userContext to use it with .provider : <userContext.Provider> ,then use it in return(<userContext.Provider><userContext.Provider>)and pass it value prop value={{ user, login, logout, loading }}
                                      // Creates a new context object named userContext This context will be used to provide and consume user authentication-related data.
const authContext = ({ children }) => {//this method takes prop called children ,it is what wrapped with <userContext.Provider><userContext.Provider>)which is <App> in main.jsx
                                    //authContext provides this functionality to child components via <userContext.Provider>
  const [user, setUser] = useState(null);// "user" is very imp ,it will be sent to employee dashboard to controll logged in employee information
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem("token");
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
        } else {
          setUser(null);//imp note: we cannot use navigate("/login") here so we set user to null and we open AdmiDashboard.jsx  
          setLoading(false)
        }
      } catch (error) {
        if (error.response && !error.response.data.error) {
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };
  return (
    <userContext.Provider value={{ user, login, logout, loading }}>
      {children}  {/**Any component wrapped in <userContext.Provider> will have access to the data or functions passed through the value prop. */}
    </userContext.Provider>
  );
};

export const useAuth = () => useContext(userContext);//Purpose: Creates and exports a custom hook named useAuth. How It Works: Calls useContext(userContext) to access the context's value. Simplifies context consumption for components by abstracting useContext.
/*creating useAuth and assigning it  useContext(userContext)  provides a clean, scalable, and reusable solution for managing and accessing authentication state in a React application
so we can access a value(user,login...) in other files by simply the following code:
import { useAuth } from './authContext';
  const { user, isLoggedIn } = useAuth();
this implementation has advantages:
1-The useAuth hook provides a cleaner interface for consuming the context.
2-The consuming component doesn’t need to know how the userContext is implemented—it just calls useAuth() to get the values.
Convenience:If you add additional logic to the hook (e.g., derived state or helper functions), it will be available wherever useAuth is used.
if this useAuth method isn't declared we must assign each one value to" useContext(userContext)" whereever we call them 
  ex:const {user}=useContext(userContext)
  this has disadvantages:
1-The component needs to know how userContext is structured and manually extract the required values.
2-If the structure of userContext changes, you need to update all components using useContext.
Lack of Derived Logic:
3-Any derived state (e.g., isLoggedIn) or helper functions must be computed repeatedly in each component.
*/
export default authContext;
