import useAxiosApi from "./Api"
import { encodeString } from "../utils/strUtils";

const useSearchApi = () => 
{
    const { api, handleErrorResponse } = useAxiosApi()

    const search = async (entity, criteria, take = 0, page = 1) =>
    {
        try {
            return (await api.post("/search", {entity: encodeString(entity), criteria: encodeString(criteria), take: take, page: page})).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }


    return {

        search,

    }
}

export default useSearchApi