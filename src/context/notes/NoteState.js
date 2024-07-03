import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const initialNotes = [];
  const [notes, setNotes] = useState(initialNotes)

  //Fetch Alll Notes
  const getNotes = async() => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3ZTlkNmRkZTY4OGRmMTYwOTkyNDZjIn0sImlhdCI6MTcxOTU5Nzc2OH0.TlfcWnYhEHueWTd3r24GkKXmVOHNiENMNfge05Cs2lY"
      }
    })
    const json = await response.json()
    setNotes(json)
  }


  //Add Note
  const addNote = async(title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3ZTlkNmRkZTY4OGRmMTYwOTkyNDZjIn0sImlhdCI6MTcxOTU5Nzc2OH0.TlfcWnYhEHueWTd3r24GkKXmVOHNiENMNfge05Cs2lY"
      },
      body: JSON.stringify({title, description, tag})
    })
    const note = {
      "_id": "668122b2b2809cdc9972d7c36hh",
      "user": "667e9d6dde688df16099246c",
      "title": title,
      "description": description,
      "tag": tag,
      "dateTime": "2024-06-30T09:17:38.434Z",
      "__v": 0
    }
    setNotes(notes.concat(note))
  }

  //Delete Note

  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3ZTlkNmRkZTY4OGRmMTYwOTkyNDZjIn0sImlhdCI6MTcxOTU5Nzc2OH0.TlfcWnYhEHueWTd3r24GkKXmVOHNiENMNfge05Cs2lY"
      },
      body: JSON.stringify()
    })
    const newNotes = notes.filter((note) => {
      return note._id !== id
    })
    setNotes(newNotes)
  }

  //Update Note

  const editNote = async (id, title, description, tag) => {
    //Api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3ZTlkNmRkZTY4OGRmMTYwOTkyNDZjIn0sImlhdCI6MTcxOTU5Nzc2OH0.TlfcWnYhEHueWTd3r24GkKXmVOHNiENMNfge05Cs2lY"
      },
      body: JSON.stringify({title, description, tag})
    })
    const newNotes = JSON.parse(JSON.stringify(notes))
    //Edit from client side
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag
        break;
      }
    }
    setNotes(newNotes)
  }


  return (<NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes}}>
    {props.children}
  </NoteContext.Provider>)
}

export default NoteState