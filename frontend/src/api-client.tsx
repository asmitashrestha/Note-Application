import React from 'react';
import axios from 'axios';

export const NoteItem = ({ note, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/note/${note.id}`);
      onDelete(note.id); // Update state or UI after successful deletion
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div>
      <h2>{note.title}</h2>
      <p>{note.description}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default NoteItem;
