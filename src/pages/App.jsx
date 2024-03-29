import React, { useEffect, useRef, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Note from "../Components/Note";
import CreateArea from "../Components/CreateArea";
import { Toaster } from "react-hot-toast";
import DropdownMenu from "../Components/DropdownMenu";
import LoginModel from "../Components/login/LoginModel";
import { ApolloProvider, ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';
import { GET_NOTES } from "../queries/noteQueries";
import RegistrationModel from "../Components/registration/RegistrationModel";
import NoteModel from "../Components/note/NoteModel";
import WithAuth from "../auth/WithAuth";
import { useNavigate } from "react-router-dom";
import ForgetPasswordModel from "../Components/login/ForgetPasswordModel";
import LoadingScreen from "./LoadingScreen";


function App() {

  const [notes, setNotes] = useState([]);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDescription, setNoteDescription] = useState("");
  const [noteId, setNoteId] = useState("");
  const [dropDown, setDropdown] = useState(false)
  const [loggedIn, setLoggedIn] = useState()
  const [loginModel, setLoginModel] = useState(false)
  const [registrationModel, setRegistrationModel] = useState(false)
  const [noteModel, setNoteModel] = React.useState(false)
  const [offset, setOffset] = useState(0)
  const navigate = useNavigate()
  const [forgetModel,setForgetModel]=useState(false)
  const [isLoading,setLoading] = useState(false)

  const ref = useRef()

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn')) {
      navigate('/home')
      setLoggedIn(true)
    } else {
      navigate('/')
      setLoggedIn(false)
    }
  }, [loggedIn])

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

  const { loading, error, data, fetchMore } = useQuery(GET_NOTES, {
    context: {
      headers: {
        "authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    },
    variables: { first: 10, offset },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      console.log("get notes:", data);
    },
    onError: (error) => {
      console.log(error.message);
      localStorage.clear();
    },
  })


  useEffect(() => {
    if (data) {
      setNotes(data.Notes)
    }
  }, [data])

  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.target;

    if (scrollTop + clientHeight === scrollHeight) {
      fetchMore({
        variables: { first: 10, offset: offset + 10 },
      });
      setOffset((prevOffset) => prevOffset + 10);
    }
  };

  return (
    <>
      <div className="h-screen w-full justify-between flex flex-col ">
      {isLoading && <LoadingScreen/>}
        <Header dropDown={dropDown} setDropdown={setDropdown} setNote={setNotes} />
        <CreateArea onAdd={addNote} />
        {forgetModel && <ForgetPasswordModel className='z-999' setForgetModel={setForgetModel} />}
        {loginModel && <LoginModel className='z-999' setLoginModel={setLoginModel} setRegistrationModel={setRegistrationModel} setLoggedIn={setLoggedIn} setForgetModel={setForgetModel} setLoading={setLoading}/>}
        {registrationModel && <RegistrationModel className='z-99999' setRegistrationModel={setRegistrationModel} setLoginModel={setLoginModel} />}
        <DropdownMenu refvar={ref} DropdownStatus={dropDown} loggedIn={loggedIn} setLoginModel={setLoginModel} setLoggedIn={setLoggedIn} />
        <div className="z-10  md:grid grid-cols-1 md:grid-cols-3 gap-5 justify-center overflow-x-scroll px-[20px] mb-[60px] md:px-[150px] py-[10px] md:py-[50px] shrink-0" onScroll={handleScroll}>
          {notes.map((noteItem, index) => {
            return (
              <Note
                key={index}
                id={noteItem.id}
                title={noteItem.title}
                description={noteItem.description}
                onDelete={deleteNote}
                setNoteId={setNoteId}
                setNoteTitle={setNoteTitle}
                setNoteDescription={setNoteDescription}
                setNoteModel={setNoteModel}
              />
            );
          })}

        </div>
        {noteModel && <NoteModel Id={noteId} Description={noteDescription} Title={noteTitle} setNoteModel={setNoteModel} />}
        <Toaster position="top-center" />
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
