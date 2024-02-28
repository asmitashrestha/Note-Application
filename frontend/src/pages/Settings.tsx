import React from 'react'
import ChangePassword from '../components/ChangePassword'
import { Link } from 'react-router-dom'

const Settings = () => {
  return (
    <div>
      <Link to={'/change-password'} className='flex justify-center text-center font-bold text-xl mt-20 text-red-900p-10'>Change Password </Link>
    </div>
  )
}

export default Settings
