const Publication = require('../models/Publication')
const notesCtrl = {}

notesCtrl.getAllNotes = async (req, res) => {
  const notes = await Publication.find({user: req.user.id}).sort({ createdAt: 'desc' })
  console.log('**********GETALLNOTES**********')
  console.log(req.user)
  console.log('**********GETALLNOTES**********')
  res.send(notes)
}

notesCtrl.createNewNote = async (req, res) => {
  const { title, description } = req.body

  if (!title) {
    return res.status(400).json({
      message: 'required title field is missing'
    })
  }

  const newNote = new Publication({ title, description })
  newNote.user = req.user.id
  const noteSaved = await newNote.save()
  console.log('**********CREATENEWNOTE**********')
  console.log(noteSaved)
  console.log('**********CREATENEWNOTE**********')

  console.log('**********CREATENEWNOTEMSG**********')
  console.log('**********CREATENEWNOTEMSG**********')
  const resNote = {
    title: noteSaved.title,
    description: noteSaved.description,
    id: noteSaved._id,
    message: 'Note Added Successfully'
  }
  res.status(201).json(resNote)
}

notesCtrl.deleteNote = async (req, res) => {
  const { id } = req.params
  await Publication.findByIdAndDelete(id)
  console.log('**********DELTENOTE**********')
  console.log({ message: 'Note deleted'})
  console.log('**********DELTENOTE**********')
  // req.flash('success_msg', 'Note Delete Successfully')
  res.status(204).json(true)
}

notesCtrl.updateNote = async (req, res) => {
  const { title, description } = req.body
  const { id } = req.params
  const note = await Publication.findById(id)
  console.log('**********UPDATE NOTE**********')
  console.log(note.user, '***', req.user.id)
  console.log('**********UPDATE NOTE**********')
  if (note.user !== req.user.id) {
    return res.status(400).json({ message: 'Not Authorized'})
  }
  await Publication.findByIdAndUpdate({ _id: id }, {
    title, description
  })
  // req.flash('success_msg', 'Note Updated Successfully')
  res.json({ message: 'Note Updated' })
}

module.exports = notesCtrl