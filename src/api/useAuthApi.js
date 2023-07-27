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

    const addUser = async (user) =>
    {
        try {
            return (await api.post("/auth/signup", user, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
            })).data.data

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


    const generatePassword = async (userID) =>
    {
        try {
            return (await api.post("/auth/generate-password" , {user_id: userID})).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }


    const updateUser = async (userID, data) =>
    {
        try {
            data?.append("_method", "PUT")
            return (await api.post("/auth/user/" + userID , data, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
            })).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const deleteUser = async (userID) =>
    {
        try {
            return (await api.delete("/auth/user/" + userID)).data.data

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


    const addRole = async (data) =>
    {
        try {
            return (await api.post("/auth/role", data)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }


    const updateRole = async (roleID, data) =>
    {
        try {
            return (await api.put("/auth/role/" + roleID, data)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const deleteRole = async (roleID) =>
    {
        try {
            return (await api.delete("/auth/role/" + roleID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const assignRolePermissions = async (roleID, permissionsID) =>
    {
        try {
            return (await api.post("/auth/role/" + roleID + "/permissions", { permissions_id: permissionsID })).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }


    const unassignRolePermissions = async (roleID, permissionsID) =>
    {
        try {
            return (await api.put("/auth/role/" + roleID + "/permissions", { permissions_id: permissionsID })).data.data

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


    const updatePermission = async (permissionID, data) =>
    {
        try {
            return (await api.put("/auth/permission/" + permissionID, data)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }


    const deletePermission = async (permissionID) =>
    {
        try {
            return (await api.delete("/auth/permission/" + permissionID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }


    const getUserRoles = async (userID) =>
    {
        try {
            return (await api.get("auth/user/" + userID + "/roles" )).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }


    const getUserPermissions = async (userID) =>
    {
        try {
            return (await api.get("auth/user/" + userID + "/permissions" )).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }


    const getRolePermissions = async (roleID) =>
    {
        try {
            return (await api.get("auth/role/" + roleID + "/permissions" )).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }


    const assignUserRoles = async (userID, rolesID) =>
    {
        try {
            return (await api.post("auth/user/" + userID + "/roles", {roles_id: rolesID} )).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }


    const assignUserPermissions = async (userID, permissionsID) =>
    {
        try {
            return (await api.post("auth/user/" + userID + "/permissions", {permissions_id: permissionsID} )).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }


    const unassignUserRoles = async (userID, rolesID) =>
    {
        try {
            return (await api.put("auth/user/" + userID + "/roles", {roles_id: rolesID} )).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }


    const unassignUserPermissions = async (userID, permissionsID) =>
    {
        try {
            return (await api.put("auth/user/" + userID + "/permissions", {permissions_id: permissionsID} )).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }


    return { 
        signin,

        signout,

        addUser,

        addRole,

        listUsers,

        listRoles,

        updateUser,

        deleteUser,

        updateRole,

        deleteRole,

        getUserRoles,

        assignUserRoles,

        listPermissions,

        updatePermission,

        deletePermission,

        generatePassword,

        unassignUserRoles,

        getUserPermissions,

        getRolePermissions,

        assignUserPermissions,

        assignRolePermissions,

        unassignUserPermissions,

        unassignRolePermissions
    }
}

export default useAuthApi