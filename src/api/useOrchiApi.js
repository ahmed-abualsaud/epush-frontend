import useAxiosApi from "./Api"

const useOrchiApi = () => 
{

  const { api, handleErrorResponse } = useAxiosApi()


  const listServices = async () => 
  {
    try {
      return (await api.get("/orchi/service"))?.data?.data

    } catch (error) {
      return handleErrorResponse(error)
    }
  }

  return { listServices }
}

export default useOrchiApi