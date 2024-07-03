import React from 'react'
import { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'

const NoteItem = (props) => {
    const context = useContext(NoteContext);
    // eslint-disable-next-line
    const { deleteNote } = context
    const { note , updateNote } = props
    const onClick = ()=>{
        deleteNote(note._id)
    }
    return (
        <div className='col-md-4 my-3'>
            <div className="card mb-3" style={{ maxwidth: "540px" }}>
                <div className="row g-0">
                    <div className="col-md-8">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <h5 className="card-title">{note.title}</h5>
                                <i className="fa-solid fa-trash mx-2" onClick={onClick}></i>
                                <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>updateNote(note)}></i>
                            </div>
                            <p className="card-text">{note.description}</p>
                            <p className="card-text">{note.tag}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
