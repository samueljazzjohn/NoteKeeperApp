import React from 'react'
import {useForm} from 'react-hook-form';
import { useMutation } from "@apollo/client";
import { UPDATE_NOTE } from "../../mutations/noteMutations";
import { GET_NOTES } from "../../queries/noteQueries";
import { toast } from 'react-hot-toast';

const NoteModel = ({Title,Description,Id,setNoteModel}) => {

    const [updateNote] = useMutation(UPDATE_NOTE,{
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
              console.log(error.message);
            },
          }
    )

    const {register, handleSubmit,setValue, formState: { errors }} = useForm({
        defaultValues: {
          title:Title,
          description: Description
        },
      });

    const onSubmit = (data) => {
        console.log(data)
        updateNote({variables: {id: Id, title: data.title, description: data.description}}).then((data) => {
            console.log(data);
            toast.success('Note Updated')
            setNoteModel(false)
          });
    }

    const handleClose = () => {
        setNoteModel(false)
    }
  return (
    <>
     <div id="defaultModal" tabIndex="-1" aria-hidden="true" className="fixed pt-5 md:pt-24 px-5 md:px-[35%] right-0 z-9999 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm">
                <div className="relative w-full bg-white bg-opacity-100 max-w-md max-h-full opacity-100 " style={{background:"white"}}>

                    <div className="relative  rounded-lg border shadow-lg">
                        <button type="button" onClick={handleClose} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center " data-modal-hide="authentication-modal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="px-6 py-6 lg:px-8">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" action="#">
                                <div>
                                    <input {...register('title')} type="text" name="title" id="title" className="w-full input focus:border-transparent focus:outline-none p-2 font-display focus:shadow-none" />
                                </div>
                                <div>
                                    <textarea {...register('description')} type="text" name="description" id="description" className="w-full input focus:border-transparent focus:outline-none p-2 h-64 font-display focus:shadow-none"/>
                                </div>
                                <button type="submit" className="w-full text-white bg-header focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
  )
}

export default NoteModel