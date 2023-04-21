import React, { useEffect, useRef, useState } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Note from "./Components/Note";
import CreateArea from "./Components/CreateArea";
import { Toaster } from "react-hot-toast";
import DropdownMenu from "./Components/DropdownMenu";
import LoginModel from "./Components/login/LoginModel";
import { ApolloProvider, ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';
import { GET_NOTES } from "./queries/noteQueries";
import RegistrationModel from "./Components/registration/RegistrationModel";


function App() {

  const [notes, setNotes] = useState([]);
  const [dropDown, setDropdown] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [loginModel, setLoginModel] = useState(false)
  const [registrationModel, setRegistrationModel] = useState(false)

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
  }, [ref])

  const { loading, error, data } = useQuery(GET_NOTES)


  useEffect(()=>{
    if(data){
      setNotes(data.Notes)
    }
  },[data])

  return (
    <>
        <div className="h-screen w-full justify-between">
          <Header dropDown={dropDown} setDropdown={setDropdown} />
          <CreateArea onAdd={addNote} />
          {loginModel && <LoginModel className='z-999' setLoginModel={setLoginModel} setRegistrationModel={setRegistrationModel} setLoggedIn={setLoggedIn} />}
          {registrationModel && <RegistrationModel className='z-99999' setRegistrationModel={setRegistrationModel} setLoginModel={setLoginModel}/>}
          <DropdownMenu refVar={ref} DropdownStatus={dropDown} loggedIn={loggedIn} setLoginModel={setLoginModel} />
          <div className="z-10 grid grid-cols-3 gap-5 justify-center overflow-x-scroll px-[150px] py-[50px] shrink-0">
            {!loading && !error && notes.map((noteItem, index) => {
              return (
                <Note
                  key={index}
                  id={index}
                  title={noteItem.title}
                  description={noteItem.description}
                  onDelete={deleteNote}
                />
              );
            })}
          </div>
          <Toaster position="bottom-right" />
          <Footer />
        </div>
    </>
  );

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
}

export default App;
