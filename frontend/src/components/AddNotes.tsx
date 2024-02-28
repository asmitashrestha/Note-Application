import React, { useState } from 'react';
import Img from '../assets/note1.jpg';
import { IoIosAddCircle } from "react-icons/io";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddNotes = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: '',
    noteId:''// Change this to hold file object
  });

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Fetch userId from localStorage
      const userId = localStorage.getItem('userId');
      console.log(userId);
  
      // Check if userId is available
      if (!userId) {
        console.error('User ID not found in localStorage');
        return;
      }
  
      const response = await axios.post(
        "http://localhost:5000/api/note/create-notes",
        {
          ...formData,
          user_id: userId // Include the user_id in the request payload
        }
      );
  
      console.log(response);
      if (response.data.noteId) {
        // If the response contains noteId, set it in formData
        setFormData({ ...formData, noteId: response.data.noteId } as any);
      }
      if (response) {
        toast.success("Note Created Successfully");
        navigate('/');
      } else {
        toast.error("Error occurred");
      }
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };
  
  return (
    <div className='flex'>
      <div className="w-[350px] h-[350px] p-10 bg-gray-200 rounded-3xl m-3 mt-20">
        <img src={Img} alt="img" className='h-[120px] w-[450px] ' />
        <div className="justify-center text-center">
          <button onClick={toggleForm} >
            <IoIosAddCircle className='text-6xl relative  top-5' />
          </button>
          <h1 className='text-pink-900 font-bold text-2xl mt-10'>Add Collection</h1>
        </div>
      </div>
      {isFormOpen && (
        <div className="w-[350px] h-[410px] bg-gray-200 rounded-3xl p-4 mt-10">
          <form onSubmit={handleSubmit}>
            {/* <div className="flex">
              <label htmlFor="image" className='mb-4 mr-2 font-semibold'>Image:</label>
              <input type="file" id="image" name="image" accept="image/*" onChange={handleChange} />
            </div> */}
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
  );
};

export default AddNotes;

