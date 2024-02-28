// EditNotes.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const EditNote = ({ noteId }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: '',
  });

  useEffect(() => {
    fetchNote();
  }, []);

  const fetchNote = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/note/${noteId}`);
      const { title, description, status } = response.data.note;
      setFormData({ title, description, status });
    } catch (error) {
      console.error("Error fetching note:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/note/update-notes/${noteId}`,
        formData
      );
      console.log(response);
      if (response) {
        toast.success("Note Updated Successfully");
        navigate('/');
      } else {
        toast.error("Error occurred");
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };
  
  return (
    <div className=''>
      <h1>Edit Note</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title: </label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="status">Status: </label>
          <input type="text" id="status" name="status" value={formData.status} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="description">Description: </label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} />
        </div>
        <button type="submit">Update Note</button>
      </form>
    </div>
  );
};

export default EditNote;
