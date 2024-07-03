import React, { useEffect } from 'react'
import { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useRef } from 'react';

const Notes = () => {
  const context = useContext(NoteContext);
  // eslint-disable-next-line
  const { notes, getNotes, editNote} = context
  useEffect(() => {
    getNotes()
  }, [])

  const[note, setNote] = useState({id: "",utitle:"", udescription:"", utag: ""})

  const ref = useRef(null);

  const refClose = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click()
    setNote({utitle:currentNote.title, udescription: currentNote.description, utag: currentNote.tag})
  }

  const onClicked = (e)=>{
    e.preventDefault()
    editNote(note.id, note.utitle, note.udescription, note.utag)
    refClose.current.click()
  }

  const onChange = (e)=>{
    setNote({...note, [e.target.name]: e.target.value})
  }

  return (
    <>
      <AddNote />
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="utitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="utitle" name='utitle' value={note.utitle} aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="udescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="udescription" value={note.udescription} name='udescription' onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="utag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="utag" value={note.utag} name='utag' onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={onClicked}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        {notes.map((note) => {
          return <NoteItem key={note._id} note={note} updateNote={updateNote}></NoteItem>
        })}
      </div>
    </>
  )
}

export default Notes
