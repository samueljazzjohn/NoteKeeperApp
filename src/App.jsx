import React from "react"

import Header from "./Components/Header"
import KeepNote from "./Components/KeepNote"
import Footer from "./Components/Footer"

import "./Style/styles.css"

function App(){
    return (
        <div className="body">
            <Header />
            <KeepNote />
            <Footer />
        </div>
    );
}

export default App;