import React, { useEffect, useRef, useState } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Note from "./Components/Note";
import CreateArea from "./Components/CreateArea";
import { Toaster } from "react-hot-toast";
import DropdownMenu from "./Components/DropdownMenu";

function App() {
  const [notes, setNotes] = useState([]);
  const [dropDown,setDropdown] = useState(false)

  const ref = useRef()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    }
      document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  },[ref])

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div className="h-[100%] w-full justify-between">
      <Header dropDown={dropDown} setDropdown={setDropdown} />
      <CreateArea onAdd={addNote} />
      <DropdownMenu refVar={ref} DropdownStatus={dropDown}/>
      <div className="z-10 grid grid-cols-3 gap-5 justify-center overflow-x-scroll px-[150px] py-[50px] shrink-0">
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      </div>
      <Toaster position="bottom-right" />
      <Footer />
    </div>
  );
}

export default App;
