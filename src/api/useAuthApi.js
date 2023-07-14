import qs from "qs"
import api from "./Api"
import { isNull } from "../utils/helper"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { getFormInputData } from '../utils/dom'
import { alertError, validate } from "../utils/validator"
import { authenticate } from "../container/redux/slice/authSlice"

const useAuthApi = () => 
{

    const dispatch = useDispatch()
    let authUser = useSelector((state) => state.auth.user)


    const signin = async () =>
    {
        if (! validate("signin_form")) { return [] }
        try {
            const user = (await api.post("/auth/signin", qs.stringify(getFormInputData("signin_form")))).data.data
            localStorage.setItem('user', JSON.stringify(user));
            dispatch(authenticate(user))
            return user

        } catch (error) {
            alertError(error.response.data.error)
            return []
        }
    }


    const getAuthenticatedUser = () => 
    {

        if (! isNull(authUser)) { return authUser }

        authUser = localStorage.getItem('user')

        if (isNull(authUser)) {
            alertError("Authentication credentials not found")
            console.log("logout")
            return null
        }

        dispatch(authenticate(JSON.parse(authUser)))
        return authUser
    }


    return { signin, getAuthenticatedUser }
}

export default useAuthApi