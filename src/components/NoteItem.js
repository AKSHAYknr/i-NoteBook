import React from 'react'

const NoteItem = (props) => {
    const { note } = props
    return (
        <div className='col-md-4 my-3'>
            <div className="card mb-3" style={{ maxwidth: "540px" }}>
                <div className="row g-0">
                    <div className="col-md-8">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <h5 className="card-title">{note.title}</h5>
                                <i className="fa-solid fa-trash mx-2"></i>
                                <i className="fa-solid fa-pen-to-square mx-2"></i>
                            </div>
                            <p className="card-text">{note.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
