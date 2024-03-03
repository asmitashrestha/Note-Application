import React, { useEffect, useState } from "react";
import me from "../assets/person.png";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 

  useEffect(()=>{
    const userData = localStorage.getItem("userData")
    if(userData) {
      setIsLoggedIn(true)
    }
  })
 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/user/login",{
          method:"POST",
          headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
          },
          body:JSON.stringify(formData),
        }
      );
    
      const data = await response.json()
      console.log("Token",data.token);  
      setIsLoggedIn(true)
      localStorage.setItem("userData",JSON.stringify(data))
      navigate('/notes')
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="bg-gray-200 h-full">
      <div className="flex  h-[500px] w-[1100px] px-[10px] py-5 ml-[4.5rem]">
        <div className="bg-cyan-500  h-[500px] w-[600px] ">
          <div className="justify-center text-center flex mt-32 mb-11">
            <img src={me} className="rounded-sm" />
          </div>

          <div className="text-center  font-sans">
            <p className="font-bold text-xl text-gray-800">
              Let's get you set up
            </p>
            <p className="leading-10 font-semibold text-gray-800">
              It should only take you a minute to connect
            </p>
          </div>
        </div>
        <div className="bg-black  h-[500px] w-[600px] ">
          <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-1 text-center text-2xl font-bold leading-1 tracking-tight text-white">
                Create an account
              </h2>
            </div>

            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    ></input>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    ></input>
                  </div>
                </div>

                <div>
                
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                  >
                    Login
                  </button>
                </div>
              </form>
               <div className="flex text-center justify-center mt-5">
                <Link to={'/reset-password'} className="text-white bg-red-500 w-[380px] rounded p-1.5">Forget Password</Link>
               </div>

              <p className="mt-5 text-center text-sm text-white">
                Don't have an account
                <Link
                  to={"/signup"}
                  className="font-bold leading-4 text-lg text-violet-200 hover:text-violet-100 ml-3"
                >
                  SignUp
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
