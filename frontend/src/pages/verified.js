import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Verified() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/login');
        }, 3000); // Navigate after 2 seconds

        // Cleanup function to clear the timer if the component unmounts before 2 seconds
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className='container' style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            Your email has been verified! Please wait while we redirect you to login...
        </div>
    );
}

export default Verified;
