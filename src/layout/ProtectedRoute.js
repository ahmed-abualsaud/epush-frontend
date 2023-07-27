import { isEmpty } from '../utils/helper'
import { useEffect, useRef } from 'react'
import { showAlert } from '../utils/validator'
import { Outlet, useNavigate } from 'react-router-dom'
import useAxiosApi from '../api/Api'

const ProtectedRoute = () => {

    const navigate = useNavigate()
    const { getAuthenticatedUser } = useAxiosApi()

    const setupLock = useRef(true)
    const setup = async () => {
        if (isEmpty(getAuthenticatedUser())) 
        {
            localStorage.clear()
            navigate("/signin")
            window.location.reload()
            showAlert("Authenticated user not found")
            
        }
    }

    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    return (<Outlet/>)
}

export default ProtectedRoute