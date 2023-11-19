import qs from "qs"
import useAxiosApi from "./Api"

const useTicketApi = () => 
{

    const { api, handleErrorResponse } = useAxiosApi()

    const getTicket = async (ticketID) =>
    {
        try {
            return (await api.get("/ticket/" + ticketID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const listTickets = async (perPage) =>
    {
        try {
            return (await api.get("/ticket?" + qs.stringify({take: perPage}))).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const addTicket = async (ticket) =>
    {
        try {
            return (await api.post("/ticket", ticket)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const updateTicket = async (ticketID, data) =>
    {
        try {
            return (await api.put("/ticket/" + ticketID, data)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const deleteTicket = async (ticketID) =>
    {
        try {
            return (await api.delete("/ticket/" + ticketID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const searchTicket = async (take, column, value) =>
    {
        try {
            return (await api.post("/ticket/search?" + qs.stringify({take: take}), {column: column, value: value})).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }


    return {

        getTicket,

        addTicket,

        updateTicket,

        deleteTicket,

        listTickets,

        searchTicket,
    }
}

export default useTicketApi