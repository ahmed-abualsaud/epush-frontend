import api from "./Api"
import useAuthApi from "./useAuthApi"
import { alertError } from "../utils/validator"

const useOrchiApi = () => 
{

  const { getAuthenticatedUser } = useAuthApi()

  api.defaults.headers.common["Authorization"] = `Bearer ${getAuthenticatedUser().token}`
  api.defaults.headers.post["Content-Type"] = "application/json"

  const listServices = async () => 
  {
    try {
      return (await api.get("/orchi/service")).data.data

    } catch (error) {
      if (error.response.status === 401) console.log('logout')
      alertError(error.response.data.error)
      return []
    }
  }

  return { listServices }
}

export default useOrchiApi