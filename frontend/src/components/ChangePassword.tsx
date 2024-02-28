import React from 'react'
import { RiLockPasswordFill } from "react-icons/ri";

const ChangePassword = () => {
  return (
    <div className='rounded flex justify-center bg-slate-300 h-[1000px]'>
      <div className="m-40 flex h-[400px] w-[400px]">
        <div className="bg-white justify-center rounded-3xl">
          <div className="p-2 ">
          <p className="pt-4 pl-2 font-bold text-xl text-blue-950">Change Password</p>
              <div className=''>
              <label
                htmlFor="password"
                className="block pl-2 mt-2 text-sm font-semibold leading-4 text-gray-800"
              >
                Old password
              </label>
              <div className="mt-1">
                <div className="relative">
                  < RiLockPasswordFill className="absolute top-3 left-3 text-gray-800 text-lg" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    placeholder="Enter your old password"
                    required
                    className="block w-[350px] rounded-md border-0 py-3.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-4 mt-2 ml-2"
                  />
                </div>
              </div>
            </div>

            <div className='mt-3'>
              <label
                htmlFor="new-password"
                className="block pl-2 text-sm font-semibold leading-4 text-gray-800"
              >
                New password
              </label>
              <div className="mt-1">
                <div className="relative">
                  < RiLockPasswordFill className="absolute top-3 left-3 text-gray-800 text-lg" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    placeholder="Enter your new password"
                    required
                    className="block w-[350px] rounded-md border-0 py-3.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-4 mt-2 ml-2 "
                  />
                </div>
              </div>
            </div>

            <div className='mt-2'>
              <label
                htmlFor="new-password"
                className="block pl-2 text-sm font-semibold leading-4 text-gray-800"
              >
                Confirm new password
              </label>
              <div className="mt-1">
                <div className="relative">
                  < RiLockPasswordFill className="absolute top-3 left-3 text-gray-800 text-lg" />
                  <input
                    id="confirm-password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    placeholder="Enter your new password"
                    required
                    className="block w-[350px] rounded-md border-0 py-3.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-4 mt-2 ml-2"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center text-center mt-7 mr-5">
              <button className='bg-blue-800 rounded w-[350px] p-3 text-white text-sm hover:text-blue-950 hover:bg-white hover:font-bold ml-2'>Change Account Password</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
