import React from 'react';
import { IoIosMail } from "react-icons/io";

const ResetPassword = () => {
  return (
    <div className='rounded flex justify-center bg-slate-300 h-[1000px]'>
      <div className="m-40 flex h-[300px] w-[400px]">
        <div className="bg-white justify-center rounded-3xl">
          <div className="p-2">
            <p className="pt-4 pl-2 font-bold text-xl text-blue-950">Reset Password</p>
            <p className='py-2 px-2 font-sans text-gray-800'>Enter your mail and check your mail. Password reset link has been sent there and is valid only for 15 minutes</p>
            <div>
              <label
                htmlFor="email"
                className="block pl-2 text-sm font-semibold leading-4 text-gray-800"
              >
                Email address
              </label>
              <div className="mt-1">
                <div className="relative">
                  <IoIosMail className="absolute top-3 left-2 text-gray-800 text-lg" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Enter your email"
                    required
                    className="block w-[360px] rounded-md border-0 py-3.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-4 mt-2"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center text-center mt-7 mr-5">
              <button className='bg-blue-800 rounded w-[360px] p-3 text-white text-sm hover:text-blue-950 hover:bg-white hover:font-bold'>Send Reset Email</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

