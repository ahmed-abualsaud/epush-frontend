import axios from 'axios'
import { Config } from '../config/Config'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from '../utils/helper'
import { signin, signout } from "../container/redux/slice/authSlice"
import { alertError } from "../utils/validator"
import { useNavigate } from 'react-router-dom'

const useAxiosApi = () => 
{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let authUser = useSelector((state) => state.auth.user)

    const getAuthenticatedUser = () => 
    {

        if (! isEmpty(authUser)) { return authUser }

        authUser = localStorage.getItem('user')

        if (isEmpty(authUser)) { return null }

        dispatch(signin(JSON.parse(authUser)))
        return authUser
    }

    const handleErrorResponse = (error) => 
    {
        if (isEmpty(error.response)){
            alertError("Backend Server is down")
        } else if (error.response?.status === 401){

            dispatch(signout())
            localStorage.clear()
            navigate("/signin")
            window.location.reload()
            alertError("Authenticated user not found")
        }
        alertError(error.response?.data?.error)
        return null
    }

    const sendGetRequest = async (url) => {
        try {
            return (await api.get(url)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const api = axios.create({ baseURL: Config.get("REACT_APP_SERVER_URL")})
    api.defaults.headers.common["Authorization"] = `Bearer ${getAuthenticatedUser()?.token}`
    api.defaults.headers.post["Content-Type"] = "application/json"

    return { api, sendGetRequest, getAuthenticatedUser, handleErrorResponse }
}

export default useAxiosApi