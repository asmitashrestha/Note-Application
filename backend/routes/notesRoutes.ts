import checkUserAuth from "../middlewares/authMiddlewares"

const express = require('express')
const {createNotes, getAllNotes, getNoteById, updateNote, deleteNoteById} = require('../controller/noteController')

const router = express.Router()
router.post('/create-notes',createNotes)
router.get('/get-notes',getAllNotes)
router.get('/get-notes/:id',getNoteById)
router.put('/update-notes/:id',updateNote)
router.delete('/delete-notes/:id',deleteNoteById)

module.exports = router