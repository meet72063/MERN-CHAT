import React, { Children, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


function Protectected({ children }) {
    const { user } = useSelector((state) => state.user)
    const navigate = useNavigate()
    useEffect(() => {

        if (!user) {
            //no user -navigate to login page
            navigate('/login')
        }
    }, [])

    return (<>
        {children}
    </>)
}

export default Protectected
