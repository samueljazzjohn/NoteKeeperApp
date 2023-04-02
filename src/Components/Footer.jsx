import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white w-full z-20 flex justify-center items-center fixed bottom-0 p-2">
      <p className="text-center mx-auto">Copyright ⓒ {year}</p>
    </footer>
  );
}

export default Footer;
