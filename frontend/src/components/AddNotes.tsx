import React, { useState } from 'react';
import Img from '../assets/note1.jpg';
import { IoIosAddCircle } from "react-icons/io";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const AddNotes = () => {
  const [user,setUser] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: ''
  });

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getTokenFromLocalStorage = () => {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      return userData.token;
    }
    return null; // Return null if user data is not found or token is missing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getTokenFromLocalStorage()
      console.log("Token add", token);
      
      const response = await fetch("http://localhost:5000/api/note/create-notes", {
        method: 'POST',
        headers:{
          "Content-Type":"application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Note Created Successfully");
        navigate('/');
      } else {
        toast.error(data.message || "Error occurred");
      }
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  return (
    <div>
      <Navbar/>
      <div className='flex'>
      <div className="w-[350px] h-[350px] p-10 bg-gray-200 rounded-3xl m-3 mt-20">
        <img src={Img} alt="img" className='h-[120px] w-[450px] ' />
        <div className="justify-center text-center">
          <button onClick={toggleForm}>
            <IoIosAddCircle className='text-6xl relative  top-5' />
          </button>
          <h1 className='text-pink-900 font-bold text-2xl mt-10'>Add Collection</h1>
        </div>
      </div>
      {isFormOpen && (
        <div className="w-[350px] h-[410px] bg-gray-200 rounded-3xl p-4 mt-10">
          <form onSubmit={handleSubmit}>
            <div className="flex mb-4">
              <label htmlFor="title" className='font-semibold mr-2'>Title: </label>
              <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className='rounded p-1.5 w-72' />
            </div>
            <div className="flex mb-4">
              <label htmlFor="status" className='font-semibold mr-2'>Status: </label>
              <input type="text" id="status" name="status" value={formData.status} onChange={handleChange} className='rounded p-1.5 w-72' />
            </div>
            <div className="">
              <label htmlFor="description" className='font-semibold '>Description:</label>
              <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={7} cols={39} className='rounded p-2' />
            </div>
            <div className="flex justify-center text-center mt-5">
              <button type="submit" className='bg-blue-800 w-[320px] p-2 ml-1 rounded'>Add Note</button>
            </div>
          </form>
        </div>
      )}

    </div>
    </div>
    
  );
};

export default AddNotes;
