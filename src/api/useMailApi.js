import qs from "qs"
import useAxiosApi from "./Api"

const useMailApi = () => 
{

    const { api, handleErrorResponse } = useAxiosApi()

    const getTemplate = async (templateID) =>
    {
        try {
            return (await api.get("/mail/template/" + templateID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const addTemplate = async (template) =>
    {
        try {
            return (await api.post("/mail/template", template)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const listTemplates = async () =>
    {
        try {
            return (await api.get("/mail/template")).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const updateTemplate = async (templateID, data) =>
    {
        try {
            return (await api.put("/mail/template/" + templateID , data)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const deleteTemplate = async (templateID) =>
    {
        try {
            return (await api.delete("/mail/template/" + templateID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const getMailSendingHandler = async (mailSendingHandlerID) =>
    {
        try {
            return (await api.get("/mail/sending-handler/" + mailSendingHandlerID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const addMailSendingHandler = async (mailSendingHandler) =>
    {
        try {
            return (await api.post("/mail/sending-handler", mailSendingHandler)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const listMailSendingHandlers = async (perPage) =>
    {
        try {
            return (await api.get("/mail/sending-handler?" + qs.stringify({take: perPage}))).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const updateMailSendingHandler = async (mailSendingHandlerID, data) =>
    {
        try {
            return (await api.put("/mail/sending-handler/" + mailSendingHandlerID , data)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const deleteMailSendingHandler = async (mailSendingHandlerID) =>
    {
        try {
            return (await api.delete("/mail/sending-handler/" + mailSendingHandlerID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }
    
    const searchMailSendingHandler = async (take, column, value) =>
    {
        try {
            return (await api.post("/mail/sending-handler/search?" + qs.stringify({take: take}), {column: column, value: value})).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }


    return {

        getTemplate,

        addTemplate,

        listTemplates,

        updateTemplate,

        deleteTemplate,

        getMailSendingHandler,

        addMailSendingHandler,

        listMailSendingHandlers,

        updateMailSendingHandler,

        deleteMailSendingHandler,

        searchMailSendingHandler,
    }
}

export default useMailApi