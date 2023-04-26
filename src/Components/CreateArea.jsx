import React, { useRef, useState,useEffect } from "react";
import AddIcon from '@mui/icons-material/Add';
import { toast } from "react-hot-toast";
import { useMutation } from "@apollo/client";
import {  ADD_NOTE } from "../mutations/noteMutations";
import { GET_NOTES } from "../queries/noteQueries";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import OptionsDropdown from "./OptionsDropdown";
import CloseIcon from '@mui/icons-material/Close';

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [optionsState, setOptionsState] = useState(false);
  const [isListing,setListing]=useState(false)

  const [createNote] = useMutation(ADD_NOTE, {
    refetchQueries: [{ query: GET_NOTES }],
    context: {
      headers: {
        "authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        },
        onCompleted: (data) => {
          console.log(data);
        },
        onError: (error) => {
          console.log(error);
        },
      }
)

  const [note, setNote] = useState({
    title: "",
    description: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;
    const currentLineIndex = event.target.selectionStart;
    if (isListing) {
      // Add a bullet point to each line after the current line
      const lines = value.split("\n");
      let length = 0;
      const newValue = lines
        .map((line, index) => {
          length=length+line.length+1;
          if (length >= currentLineIndex - 1) {
            return line.replace(/^(?!\s*•\s*)/, "• ");
          } else {
            return line;
          }
        })
        .join("\n");
      setNote((prevNote) => {
        return {
          ...prevNote,
          [name]: newValue,
        };
      });
    } else {
      setNote((prevNote) => {
        return {
          ...prevNote,
          [name]: value,
        };
      });
    }
  }
  
  

  // function handleChange(event) {
  //   const { name, value } = event.target;
  //   console.log(value.split("/n"));
  //   // console.log(value.split("/n").length);
  //   if (isListing) {
  //     // Add a bullet point to the beginning of the line
  //     const newValue = value.replace(/^(?!\s*•\s*)/gm, "• ");
  //     setNote(prevNote => {
  //       return {
  //         ...prevNote,
  //         [name]: newValue
  //       };
  //     });
  //   } else {
  //     setNote(prevNote => {
  //       return {
  //         ...prevNote,
  //         [name]: value
  //       };
  //     });
  //   }

  //   // setNote(prevNote => {
  //   //   return {
  //   //     ...prevNote,
  //   //     [name]: value
  //   //   };
  //   // });
  // }

  const toggleListing=()=> {
    setListing(!isListing);
  }

  function submitNote(event) {
    if(note["title"]==''&&note["description"]==''){
      toast.error('Cannot create empty note')
    }else{
      if(localStorage.getItem('isLoggedIn')){
        createNote({variables: {title: note["title"], description: note["description"]}}).then((data) => {
          console.log(data);
        });
      }
      props.onAdd(note);
      setNote({
        title: "",
        description: ""
      });
      event.preventDefault();
    }
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div className="px-2 md:px-[150px] pt-[50px] relative w-full h-[40%] flex justify-start z-0">
      <form className="create-note relative flex flex-col border border-gray-300 h-fit p-5 rounded-md lg:w-[40%] w-[80%] mx-auto">
      {isExpanded && !optionsState && <MoreVertIcon onClick={()=>{setOptionsState(true)}} className="absolute top-3 right-3 cursor-pointer text-gray-300 " />}
      {isExpanded && optionsState && <CloseIcon onClick={()=>{setOptionsState(false)}} className="absolute top-3 right-3 cursor-pointer text-gray-300 " />}
      {optionsState && <OptionsDropdown toggleListing={toggleListing} setOptionsState={setOptionsState}/>}
        {isExpanded && (
          <input
            className="input focus:border-none focus:outline-none p-2 font-display"
            tabIndex={1}
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}

        <textarea
          className="input focus:border-transparent focus:outline-none p-2 font-display focus:shadow-none" 
          name="description"
          tabIndex={2}
          onClick={expand}
          onChange={handleChange}
          value={note.description}
          placeholder="Take a note..."
          rows={isExpanded ? 5 : 1}
        />

         {isExpanded ? <div onClick={submitNote} className="h-10 w-10 bg-[#f5ba13] rounded-full translate-x-[380px] translate-y-10 flex justify-center items-center cursor-pointer">
          <AddIcon className="text-white"/>
        </div>: <></>} 
      </form>
    </div>
  );
}

export default CreateArea;
