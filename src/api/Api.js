import axios from 'axios'
import { Config } from '../config/Config'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty, roleExists } from '../utils/helper'
import { showAlert } from "../utils/validator"
import { useNavigate } from 'react-router-dom'
import { signin, signout, updateAuthUser } from "../container/redux/slice/authSlice"

const useAxiosApi = () => 
{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let authUser = useSelector(state => state.auth.user)

    const updateAuthenticatedUser = (user) => 
    {
        let usr = {...getAuthenticatedUser()}

        if (user?.id === usr?.user.id) {
            usr.user = {...user}
            localStorage.setItem('user', JSON.stringify(usr));
            dispatch(updateAuthUser(usr.user))
        }
    }

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
        console.log(error)
        if (isEmpty(error.response)){
            showAlert("The Backend Server is Down")
            return null
        } else if (error.response?.status === 401){

            dispatch(signout())
            localStorage.clear()
            navigate("/signin")
            window.location.reload()
            showAlert("Authenticated user not found")
            return null
        }
        showAlert(error.response?.data?.error ?? error.response?.data?.message)
        return null
    }

    const sendGetRequest = async (url) => {
        try {
            if (roleExists(authUser.roles, "partner")) {
                url += url.includes("?") ? "&" : "?"
                url += "partner_id=" + authUser.user.id
            }
            return (await api.get(url)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const sendPostRequest = async (url, data) => {
        try {
            return (await api.post(url, data)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const api = axios.create({ baseURL: Config.get("REACT_APP_SERVER_URL")})
    api.defaults.headers.common["Authorization"] = `Bearer ${getAuthenticatedUser()?.token}`
    api.defaults.headers.post["Content-Type"] = "application/json"

    return { 
        api, 

        sendGetRequest, 
        
        sendPostRequest, 
        
        getAuthenticatedUser, 
        
        handleErrorResponse,

        updateAuthenticatedUser
    }
}

export default useAxiosApi