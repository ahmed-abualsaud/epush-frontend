import useAxiosApi from "./Api"

const useCoreApi = () => 
{

    const { api, handleErrorResponse } = useAxiosApi()

    const getClient = async (userID) =>
    {
        try {
            return (await api.get("/client/" + userID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const addClient = async (client) =>
    {
        try {
            return (await api.post("/client", client, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
            })).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    return {

        getClient,

        addClient

    }
}

export default useCoreApi