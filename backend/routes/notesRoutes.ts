import checkUserAuth from "../middlewares/authMiddlewares"

const express = require('express')
const {createNotes, getAllNotes, getNoteById, updateNote, deleteNoteById} = require('../controller/noteController')

const router = express.Router()
router.post('/create-notes',checkUserAuth,createNotes)
router.get('/get-notes',checkUserAuth,getAllNotes)
router.get('/get-notes/:id',checkUserAuth,getNoteById)
router.put('/update-notes/:id',checkUserAuth,updateNote)
router.delete('/delete-notes/:id',checkUserAuth,deleteNoteById)

module.exports = router