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


    return {


        getTemplate,

        addTemplate,

        listTemplates,

        updateTemplate,

        deleteTemplate,
    }
}

export default useMailApi