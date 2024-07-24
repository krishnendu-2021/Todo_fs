import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const noteInitial = [];

  const [notes, setNotes] = useState(noteInitial);

  const getNote = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    };
    const response = await fetch(
      `/api/notes/fetchallnotes`,
      requestOptions
    );
    const data = await response.json();
    setNotes(data);
  };

  //add a note
  const addNote = async (title, description, tag) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    };
    const response = await fetch(`/api/notes/addnote`, requestOptions);
    const data = await response.json({ title, description, tag });
    console.log(data);
    setNotes(notes.concat(data));
  };

  //delete a note
  const deleteNote = async (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    };
    const response = await fetch(
      `/api/notes/deletenote/${id}`,
      requestOptions
    );
    const data = await response.json();
    console.log(data);
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
  };

  //edit a note
  const editNote = async (id, title, description, tag) => {

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    };
    const response = await fetch(
      `/api/notes/updatenote/${id}`,
      requestOptions
    );
    const data = await response.json();
    console.log(data);

    let newNote = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      }
    }
    setNotes(newNote);
  };

  return (
    <noteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNote }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
