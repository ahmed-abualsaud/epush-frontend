import qs from "qs"
import useAxiosApi from "./Api"

const useNotificationApi = () => 
{
    const getNotification = async (notificationID) =>
    {
        try {
            return (await api.get("/notification/" + notificationID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const getUserNotifications = async (userID) =>
    {
        try {
            return (await api.get("/notification/user-notifications/" + userID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const getUserUnreadNotifications = async (userID) =>
    {
        try {
            return (await api.get("/notification/user-unread-notifications/" + userID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const addNotification = async (notification) =>
    {
        try {
            return (await api.post("/notification", notification)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const listNotifications = async (perPage) =>
    {
        try {
            return (await api.get("/notification?" + qs.stringify({take: perPage}))).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const updateNotification = async (notificationID, data) =>
    {
        try {
            return (await api.put("/notification/" + notificationID , data)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const updateUserNotifications = async (userID, data) =>
    {
        try {
            return (await api.put("/notification/user-notifications/" + userID , data)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const deleteNotification = async (notificationID) =>
    {
        try {
            return (await api.delete("/notification/" + notificationID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }
    
    const searchNotification = async (take, column, value) =>
    {
        try {
            return (await api.post("/notification/search?" + qs.stringify({take: take}), {column: column, value: value})).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const { api, handleErrorResponse } = useAxiosApi()

    const getTemplate = async (templateID) =>
    {
        try {
            return (await api.get("/notification/template/" + templateID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const addTemplate = async (template) =>
    {
        try {
            return (await api.post("/notification/template", template)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const listTemplates = async () =>
    {
        try {
            return (await api.get("/notification/template")).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const updateTemplate = async (templateID, data) =>
    {
        try {
            return (await api.put("/notification/template/" + templateID , data)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const deleteTemplate = async (templateID) =>
    {
        try {
            return (await api.delete("/notification/template/" + templateID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const getNotificationSendingHandler = async (notificationSendingHandlerID) =>
    {
        try {
            return (await api.get("/notification/sending-handler/" + notificationSendingHandlerID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const addNotificationSendingHandler = async (notificationSendingHandler) =>
    {
        try {
            return (await api.post("/notification/sending-handler", notificationSendingHandler)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const listNotificationSendingHandlers = async (perPage) =>
    {
        try {
            return (await api.get("/notification/sending-handler?" + qs.stringify({take: perPage}))).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const updateNotificationSendingHandler = async (notificationSendingHandlerID, data) =>
    {
        try {
            return (await api.put("/notification/sending-handler/" + notificationSendingHandlerID , data)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const deleteNotificationSendingHandler = async (notificationSendingHandlerID) =>
    {
        try {
            return (await api.delete("/notification/sending-handler/" + notificationSendingHandlerID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }
    
    const searchNotificationSendingHandler = async (take, column, value) =>
    {
        try {
            return (await api.post("/notification/sending-handler/search?" + qs.stringify({take: take}), {column: column, value: value})).data.data

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

        getNotification,

        addNotification,

        listNotifications,

        updateNotification,

        deleteNotification,

        searchNotification,

        getUserNotifications,

        updateUserNotifications,

        getUserUnreadNotifications,

        getNotificationSendingHandler,

        addNotificationSendingHandler,

        listNotificationSendingHandlers,

        updateNotificationSendingHandler,

        deleteNotificationSendingHandler,

        searchNotificationSendingHandler,
    }
}

export default useNotificationApi