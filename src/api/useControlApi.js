import axios from 'axios'
import { Config } from '../config/Config'
import { showAlert } from '../utils/validator'
import { isEmpty } from '../utils/helper'

const useControlApi = () => 
{
    const api = axios.create({ baseURL: Config.get("REACT_APP_SERVER_URL")})

    const handleErrorResponse = (error) => 
    {
        console.log(error)
        if (isEmpty(error.response)){
            showAlert("The Backend Server is Down")
            return null
        }

        showAlert(error.response?.data?.error ?? error.response?.data?.message)
        return null
    }

    const get = async () => {
        try {
            return (await api.get("/control/timestamp")).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const post = async (timestamp) => {
        try {
            return (await api.post("/control/timestamp", {control_timestamp: timestamp})).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    api.defaults.headers.post["Content-Type"] = "application/json"

    return { 

        get,

        post
    }
}

export default useControlApi