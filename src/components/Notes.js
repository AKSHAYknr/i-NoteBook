import React from 'react'
import { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'
import NoteItem from './NoteItem';

const Notes = () => {
    const context = useContext(NoteContext);
    // eslint-disable-next-line
    const {notes, setNote} = context
  return (
    <div className="row my-3">
        {notes.map((note)=>{
            return <NoteItem key={note._id} note={note}></NoteItem>
        })}
    </div>
  )
}

export default Notes
