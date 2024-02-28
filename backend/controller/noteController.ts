const db = require("../models");

// create a new notes
// exports.createNotes = async (req, res, next) => {

//   try {
//     const userId = req.body.user_id;
//     const user = await db.User.findByPk(userId);
//     if(!user){
//       console.error("User not found")
//       return
//     }
//     const { title, description, status } = req.body;

//     if (!title || !description || !status) {
//       return res.status(400).json({
//         message: "All fields are required.",
//       });
//     }

//     const newNote = await db.Note.create({
//       title: title,
//       description: description,
//       // user_id: user_id,
//       status: status,
//       // noteId:noteId,
//       user_id: userId,
//     });

//     res.status(201).json(newNote);
//   } catch (error) {
//     console.error("Error creating note:", error);
//     res.status(500).json({
//       message: "Internal Server Error",
//     });
//   }
// };

exports.createNotes = async (req, res, next) => {
  try {
    const userId = req.body.user_id;
    const user = await db.User.findByPk(userId);
    if (!user) {
      console.error("User not found");
      return;
    }
    const { title, description, status } = req.body;

    if (!title || !description || !status) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    const newNote = await db.Note.create({
      title: title,
      description: description,
      status: status,
      user_id: userId,
    });

    // Include noteId in the response
    res.status(201).json({
      ...newNote.toJSON(),
      noteId: newNote.id // Assuming the primary key of Note model is 'id'
    });
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};


// get all created notes
exports.getAllNotes = async (req, res) => {
  try {
    const allNotes = await db.Note.findAll();
    res.status(200).json(allNotes);
  } catch (error) {
    console.error("Error getting all notes:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// get a note by specific id

exports.getNoteById = async (req, res) => {
  const noteId = req.params.id;

  try {
    const note = await db.Note.findByPk(noteId);

    if (!note) {
      return res.status(404).json({
        message: "Note not found.",
      });
    }

    res.status(200).json(note);
  } catch (error) {
    console.error("Error getting note by ID:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Update a note by ID
exports.updateNote = async (req, res) => {
  const noteId = req.params.id;
  const { title, description, status } = req.body;

  try {
    const note = await db.Note.findByPk(noteId);

    if (!note) {
      return res.status(404).json({
        message: "Note not found.",
      });
    }

    // Update note properties
    note.title = title;
    note.description = description;
    note.status = status;

    // Save the updated note
    await note.save();

    res.status(200).json({
      msg: "Note updated successfully",
      note,
    });
  } catch (error) {
    console.error("Error updating note by ID:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.deleteNoteById = async (req, res) => {
  const noteId = req.params.id;

  try {
    const note = await db.Note.findByPk(noteId);

    if (!note) {
      return res.status(404).json({
        message: "Note not found.",
      });
    }

    // Delete the note
    await note.destroy();

    res.status(200).json({
      msg: "Note deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting note by ID:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
