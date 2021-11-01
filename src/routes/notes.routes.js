const { Router } = require('express')
const router = Router()

const { createNewNote, getAllNotes, updateNote, deleteNote } = require('../controllers/notes.controllers')
const { isAuthenticated } = require('../helpers/auth')

// get all note
router.get('/notes', isAuthenticated, getAllNotes)
// new note
router.post('/notes/add', isAuthenticated, createNewNote)
// edit notes
router.put('/notes/edit/:id', isAuthenticated, updateNote)
// delete notes
router.delete('/notes/delete/:id', isAuthenticated, deleteNote)

module.exports = router