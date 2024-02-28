import React, { useEffect, useState } from "react";
import Img from "../assets/note1.jpg";
import AddNotes from "./AddNotes";
import axios from "axios";
import { toast } from "react-toastify";

const Notes = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
  });
  const [editNoteId, setEditNoteId] = useState(null); // State to track the ID of the note being edited

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/note/get-notes"
        );
        console.log(response.data);
        setNotes(response.data);
        toast.success("Data fetched successfully");
      } catch (error) {
        console.error(error);
        toast.error("Error occurred");
      }
    };

    fetchNotes();
  }, []);

  const handleDelete = async (noteId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/note/delete-notes/${noteId}`
      );
      if (response.status === 200) {
        toast.success("Note Deleted Successfully");
        setNotes(notes.filter((note) => note.id !== noteId));
      } else {
        console.error(
          "Error occurred while deleting note:",
          response.data.message
        );
        toast.error("Error occurred while deleting note");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Error occurred while deleting note");
    }
  };

  const handleEdit = async (noteId) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/note/update-notes/${noteId}`,
        formData
      );
      console.log(response);
      if (response) {
        toast.success("Note Updated Successfully");
        setEditNoteId(null); // Reset editNoteId after successful update
      } else {
        toast.error("Error occurred");
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  // Function to pre-fill form data with the current note values
  const populateFormData = (noteId) => {
    const noteToEdit = notes.find((note) => note.id === noteId);
    if (noteToEdit) {
      setFormData({
        title: noteToEdit.title,
        description: noteToEdit.description,
        status: noteToEdit.status,
      });
    }
  };

  return (
    <div className="bg-red-200 h-[2000px] mt-0">
      <h1 className="flex justify-center text-center font-extrabold text-3xl pt-10 text-yellow-50">
        Your Notes Collection
      </h1>

      {notes.map((data, index) => (
        <div key={index} className="ml-10 pt-20 flex lg:flex-wrap justify-center ">
          <div className="w-[350px] h-[350px] p-10 bg-gray-200 rounded-3xl m-3 relative">
            <img src={Img} alt="img" className="h-[120px] w-[450px] " />
            <h1 className="text-pink-900 font-bold text-lg">{data.title}</h1>
            <p className="text-gray-800">{data.status}</p>
            <p className="text-gray-800">{data.description}</p>
            <div className="flex justify-between mt-9">
              <div className="">
                <button
                  onClick={() => handleDelete(data.id)}
                  className="bg-red-700 py-3 px-8 rounded-3xl text-lg text-white hover:bg-red-200 hover:text-red-950 font-semibold absolute bottom-5"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setEditNoteId(data.id); // Set editNoteId when Edit button is clicked
                    populateFormData(data.id); // Populate form data with current note values
                    toggleForm(); // Open the form
                  }}
                  className="bg-green-700 py-3 px-10 rounded-3xl text-white text-lg hover:bg-green-200 hover:text-green-950 font-semibold ml-12 absolute top-[280px] right-[20px]"
                >
                  Edit
                </button>
                {isFormOpen && editNoteId === data.id && ( // Conditionally render the form for the clicked note
                  <div className="absolute bottom-[20px] left-[400px] w-[350px] h-[410px] bg-gray-200 rounded-3xl p-4 mt-10">
                    <form onSubmit={() => handleEdit(data.id)}>
                      <div className="flex mb-4">
                        <label htmlFor="title" className="font-semibold mr-2">
                          Title:{" "}
                        </label>
                        <input
                          type="text"
                          id="title"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          className="rounded p-1.5 w-72"
                        />
                      </div>
                      <div className="flex mb-4">
                        <label htmlFor="status" className="font-semibold mr-2">
                          Status:{" "}
                        </label>
                        <input
                          type="text"
                          id="status"
                          name="status"
                          value={formData.status}
                          onChange={handleChange}
                          className="rounded p-1.5 w-72"
                        />
                      </div>
                      <div className="">
                        <label htmlFor="description" className="font-semibold ">
                          Description:
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          rows={7}
                          cols={39}
                          className="rounded p-2"
                        />
                      </div>
                      <div className="flex justify-center text-center mt-5">
                        <button
                          type="submit"
                          className="bg-blue-800 w-[320px] p-2 ml-1 rounded"
                        >
                          Update Note
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="pt-[-10px] flex flex-wrap justify-center bg-red-200 ">
        <div className="ml-10 pb-5">
          <AddNotes />
        </div>
      </div>
    </div>
  );
};

export default Notes;
