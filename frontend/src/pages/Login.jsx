import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null)
  const {login} = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    try {
      const response = await axios.post(//comm3:response: Holds the server's response object, which typically includes (data & status):data: Contains the actual response data from the server(e.g., success status, user details, token...)  status: The HTTP status code (e.g., 200, 400, etc.).
        "http://localhost:5000/api/auth/login",//coment1:this route is called in backend,and it has nothing to do with the website url(they are required in postman only),only <Routes> in App.jsx are ones that appears in url
        { email, password }//coment2:pass the route these data
      );
      if(response.data.success){
        login(response.data.user)//
        localStorage.setItem("token", response.data.token)//Stores the authentication token (response.data.token) in the browser's localStorage.Why Store the Token: The token is used to authenticate subsequent requests to the server. For example, it may be included in the Authorization header of HTTP requests to access protected routes.javascriptCopy code
        
        if(response.data.user.role === "admin") {
            navigate('/admin-dashboard')
        } else {
            navigate("/employee-dashboard")
        }
      }
    } catch (error) {
      if(error.response && !error.response.data.success)//bring the error from server by error.response,then set in to error var in useState then display error down by {error && <p>{error}</p>}
      {
        setError(error.response.data.error)
      } else {
        setError("Server Error")
      }
    }
  };

  return (
    <div
      className="flex flex-col items-center h-screen justify-center 
    bg-gradient-to-b from-teal-600 from-50% to-gray-100 to-50% space-y-6"
    >
      <h2 className="font-pacific text-3xl text-white">
        Employee Management System
      </h2>
      <div className="border shadow p-6 w-80 bg-white">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
             // value="admin@gmail.com"
              className="w-full px-3 py-2 border"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border"
              //value="admin"
              placeholder="*****"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 flex items-center justify-between">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2 text-gray-700">Remember me</span>
            </label>
            <a href="#" className="text-teal-600">
              Forgot password?
            </a>
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2 "
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

