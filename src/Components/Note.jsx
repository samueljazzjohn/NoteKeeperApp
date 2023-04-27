import React from "react";
import { useMutation } from "@apollo/client";
import { DELETE_NOTE } from "../mutations/noteMutations";
import { GET_NOTES } from "../queries/noteQueries";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css


function Note(props) {

  const [deleteNote] = useMutation(DELETE_NOTE,{
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
  );
  
  const handleDelete=(e)=> {
    e.stopPropagation();
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            deleteNote({variables: {id: props.id}}).then((data) => {
              console.log(data);
            });
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
    
  }

  const noteHandle=()=>{
    props.setNoteModel(true)
    props.setNoteTitle(props.title)
    props.setNoteDescription(props.description)
    props.setNoteId(props.id)
  }

  return (
    <div className="p-5 border border-gray-300 rounded-md w-27% cursor-pointer" onClick={noteHandle}>
      <h1 className="font-display uppercase" >{props.title}</h1>
      <p className="font-display first-letter:uppercase">{props.description}</p>
      <div className="flex flex-row-reverse">

      <button className="ralative text-white bg-[#f5ba13] p-2 rounded-md cursor-pointer" onClick={handleDelete}>DELETE</button>
      </div>
    </div>
  );
}

export default Note;
