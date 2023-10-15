import qs from "qs"
import useAxiosApi from "./Api"

const useSMSApi = () => 
{

    const { api, handleErrorResponse } = useAxiosApi()

    const getTemplate = async (templateID) =>
    {
        try {
            return (await api.get("/sms/template/" + templateID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const addTemplate = async (template) =>
    {
        try {
            return (await api.post("/sms/template", template)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const listTemplates = async () =>
    {
        try {
            return (await api.get("/sms/template")).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const updateTemplate = async (templateID, data) =>
    {
        try {
            return (await api.put("/sms/template/" + templateID , data)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const deleteTemplate = async (templateID) =>
    {
        try {
            return (await api.delete("/sms/template/" + templateID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const getSMSSendingHandler = async (smsSendingHandlerID) =>
    {
        try {
            return (await api.get("/sms/sending-handler/" + smsSendingHandlerID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const addSMSSendingHandler = async (smsSendingHandler) =>
    {
        try {
            return (await api.post("/sms/sending-handler", smsSendingHandler)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const listSMSSendingHandlers = async (perPage) =>
    {
        try {
            return (await api.get("/sms/sending-handler?" + qs.stringify({take: perPage}))).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const updateSMSSendingHandler = async (smsSendingHandlerID, data) =>
    {
        try {
            return (await api.put("/sms/sending-handler/" + smsSendingHandlerID , data)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const deleteSMSSendingHandler = async (smsSendingHandlerID) =>
    {
        try {
            return (await api.delete("/sms/sending-handler/" + smsSendingHandlerID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }
    
    const searchSMSSendingHandler = async (take, column, value) =>
    {
        try {
            return (await api.post("/sms/sending-handler/search?" + qs.stringify({take: take}), {column: column, value: value})).data.data

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

        getSMSSendingHandler,

        addSMSSendingHandler,

        listSMSSendingHandlers,

        updateSMSSendingHandler,

        deleteSMSSendingHandler,

        searchSMSSendingHandler,
    }
}

export default useSMSApi