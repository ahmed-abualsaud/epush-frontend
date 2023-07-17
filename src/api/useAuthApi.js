import qs from "qs"
import useAxiosApi from "./Api"
import { useDispatch } from "react-redux"
import { getFormInputData } from '../utils/dom'
import { useNavigate } from "react-router-dom"
import { validate } from "../utils/validator"
import { signin as authSignin, signout as authSignout } from "../container/redux/slice/authSlice"

const useAuthApi = () => 
{

    const { api, handleErrorResponse } = useAxiosApi()
    const dispatch = useDispatch()
    const navigate = useNavigate()

 

    const signin = async () =>
    {
        if (! validate("signin_form")) { return [] }
        try {
            const user = (await api.post("/auth/signin", getFormInputData("signin_form"))).data.data
            localStorage.setItem('user', JSON.stringify(user));
            dispatch(authSignin(user))
            return user

        } catch (error) {
            return handleErrorResponse(error)
        }
    }


    const signout = async () => 
    {
        try {
            await api.post("/auth/signout")
            dispatch(authSignout())
            localStorage.clear()
            navigate("/signin")
            window.location.reload()

        } catch (error) {
            return handleErrorResponse(error)
        }
    }


    const listUsers = async (perPage) =>
    {
        try {
            return (await api.get("/auth/user?" + qs.stringify({take: perPage}))).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }


    const listRoles = async (perPage) =>
    {
        try {
            return (await api.get("/auth/role?" + qs.stringify({take: perPage}))).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }


    const listPermissions = async (perPage) =>
    {
        try {
            return (await api.get("/auth/permission?" + qs.stringify({take: perPage}))).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    return { signin, signout, listUsers, listRoles, listPermissions }
}

export default useAuthApi