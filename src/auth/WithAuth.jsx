import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const WithAuth = () => {
    return function AuthenticatedComponent(props){
        const navigate=useNavigate()
        const isAuthenticated = localStorage.getItem("isLoggedin");
        useEffect(() => {
            if (!isAuthenticated) {
                navigate("/");
                localStorage.clear();
            }
        }, [isAuthenticated, navigate]);
        if(!isAuthenticated){
            return null
        }

        return <props.component {...props} />;
    }
}

export default WithAuth