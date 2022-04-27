import React from "react"

import "../Style/styles.css"

function Footer() {

    const date = new Date();

    return (
        <footer>
            <p>Copyright @ {date.getFullYear()}</p>
        </footer>
    )
}


export default Footer;