import useAxiosApi from "./Api"
import { encodeString } from "../utils/strUtils"
import { isEmpty, roleExists } from "../utils/helper"

const useSearchApi = () => 
{
    const { api, handleErrorResponse, getAuthenticatedUser } = useAxiosApi()
    const authUser = getAuthenticatedUser()

    const search = async (entity, criteria, take = 0, page = 1) =>
    {
        if (["client", "message", "message_group", "order", "message_group_recipient", "message_recipient", "message_segment"].includes(entity) && ! isEmpty(criteria) && roleExists(authUser.roles, "partner")) {
            criteria += " AND partner_id = " + authUser.user.id
        }

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