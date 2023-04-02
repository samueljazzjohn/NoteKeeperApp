import React from "react";

function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="p-5 border border-gray-300 rounded-md w-27%">
      <h1 className="font-display uppercase" >{props.title}</h1>
      <p className="font-display first-letter:uppercase">{props.content}</p>
      <div className="flex flex-row-reverse">

      <button className="ralative text-white bg-[#f5ba13] p-2 rounded-md cursor-pointer" onClick={handleClick}>DELETE</button>
      </div>
    </div>
  );
}

export default Note;
