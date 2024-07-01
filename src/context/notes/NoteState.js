import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const initialNotes = [
        {
          "_id": "6681228ab2809cdc9972d7c1",
          "user": "667e9d6dde688df16099246c",
          "title": "My title",
          "description": "My name is akshay",
          "tag": "My tag",
          "dateTime": "2024-06-30T09:16:58.125Z",
          "__v": 0
        },
        {
          "_id": "668122b2b2809cdc9972d7c3",
          "user": "667e9d6dde688df16099246c",
          "title": "New Note",
          "description": "Note for just testing",
          "tag": "#note",
          "dateTime": "2024-06-30T09:17:38.434Z",
          "__v": 0
        },
        {
            "_id": "668122b2b2809cdc9972d7c35",
            "user": "667e9d6dde688df16099246c",
            "title": "New Note",
            "description": "Note for just testing",
            "tag": "#note",
            "dateTime": "2024-06-30T09:17:38.434Z",
            "__v": 0
        },
        {
            "_id": "668122b2b2809cdc9972d7c36",
            "user": "667e9d6dde688df16099246c",
            "title": "New Note",
            "description": "Note for just testing",
            "tag": "#note",
            "dateTime": "2024-06-30T09:17:38.434Z",
            "__v": 0
        }
      ]
    const [notes, setNotes] = useState(initialNotes)
    
    return (<NoteContext.Provider value={{notes, setNotes}}>
        {props.children}
    </NoteContext.Provider>)
}

export default NoteState