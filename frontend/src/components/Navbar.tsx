import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex justify-between p-2.5'>
      <h2 className='font-bold ml-6 text-2xl text-gray-800 hover:text-blue-800'>MirageMemoir</h2>
      <nav className='flex'>
        <ul className=' font-bold text-xl mr-96'><Link className='text-gray-900 hover:text-green-950' to={'/notes'}>My Notes</Link></ul>
        <ul className=' font-bold text-xl mr-3'><Link className='text-cyan-900 hover:text-green-950' to={'/login'}>Login</Link></ul>
        <ul className=' font-bold text-xl mr-3'><Link className='text-cyan-900 hover:text-green-950' to={'/signup'}>SignUp</Link></ul>
        <ul className='mr-3 font-bold text-xl'><Link to={'/add-notes'} className='text-gray-800 hover:text-blue-950'>Add Notes</Link></ul>
        <ul className='mr-3 font-bold text-xl'><Link to={'/settings'} className='text-gray-800 hover:text-blue-950'>Settings</Link></ul>
      </nav>  
    </div>
  )
}

export default Navbar
