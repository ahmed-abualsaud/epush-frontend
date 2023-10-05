import qs from "qs"
import useAxiosApi from "./Api"

const useCoreApi = () => 
{

    const { api, handleErrorResponse } = useAxiosApi()

    const getAdmin = async (userID) =>
    {
        try {
            return (await api.get("/admin/" + userID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const addAdmin = async (admin) =>
    {
        try {
            return (await api.post("/admin", admin, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
            })).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const listAdmins = async (perPage) =>
    {
        try {
            return (await api.get("/admin?" + qs.stringify({take: perPage}))).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const updateAdmin = async (userID, data) =>
    {
        try {
            data?.append("_method", "PUT")
            return (await api.post("/admin/" + userID , data, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
            })).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const deleteAdmin = async (userID) =>
    {
        try {
            return (await api.delete("/admin/" + userID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }
    
    const searchAdmin = async (take, column, value) =>
    {
        try {
            return (await api.post("/admin/search?" + qs.stringify({take: take}), {column: column, value: value})).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

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

    const listClients = async (perPage) =>
    {
        try {
            return (await api.get("/client?" + qs.stringify({take: perPage}))).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const getClientOrders = async (userID) =>
    {
        try {
            return (await api.get("/client/" + userID + "/orders")).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const getClientLatestOrder = async (userID) =>
    {
        try {
            return (await api.get("/client/" + userID + "/latest-order")).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const updateClient = async (userID, data) =>
    {
        try {
            data?.append("_method", "PUT")
            return (await api.post("/client/" + userID , data, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
            })).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const deleteClient = async (userID) =>
    {
        try {
            return (await api.delete("/client/" + userID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }
    
    const searchClient = async (take, column, value) =>
    {
        try {
            return (await api.post("/client/search?" + qs.stringify({take: take}), {column: column, value: value})).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const listSales = async () =>
    {
        try {
            return (await api.get("/sales")).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const addSales = async (data) =>
    {
        try {
            return (await api.post("/sales", data)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const updateSales = async (salesID, data) =>
    {
        try {
            return (await api.put("/sales/" + salesID, data)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const deleteSales = async (salesID) =>
    {
        try {
            return (await api.delete("/sales/" + salesID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const listPricelists = async () =>
    {
        try {
            return (await api.get("/pricelist")).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const addPricelist = async (data) =>
    {
        try {
            return (await api.post("/pricelist", data)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const updatePricelist = async (pricelistID, data) =>
    {
        try {
            return (await api.put("/pricelist/" + pricelistID, data)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const deletePricelist = async (pricelistID) =>
    {
        try {
            return (await api.delete("/pricelist/" + pricelistID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const listBusinessFields = async () =>
    {
        try {
            return (await api.get("/business-field")).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const addBusinessField = async (data) =>
    {
        try {
            return (await api.post("/business-field", data)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const updateBusinessField = async (businessFieldID, data) =>
    {
        try {
            return (await api.put("/business-field/" + businessFieldID, data)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const deleteBusinessField = async (businessFieldID) =>
    {
        try {
            return (await api.delete("/business-field/" + businessFieldID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const getCountry = async (countryID) =>
    {
        try {
            return (await api.get("/country/" + countryID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const addCountry = async (country) =>
    {
        try {
            return (await api.post("/country", country)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const listCountries = async (perPage) =>
    {
        try {
            return (await api.get("/country?" + qs.stringify({take: perPage}))).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const updateCountry = async (countryID, data) =>
    {
        try {
            return (await api.put("/country/" + countryID , data)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const deleteCountry = async (countryID) =>
    {
        try {
            return (await api.delete("/country/" + countryID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }
    
    const searchCountry = async (take, column, value) =>
    {
        try {
            return (await api.post("/country/search?" + qs.stringify({take: take}), {column: column, value: value})).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const getSMSC = async (smscID) =>
    {
        try {
            return (await api.get("/smsc/" + smscID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const addSMSC = async (smsc) =>
    {
        try {
            return (await api.post("/smsc", smsc)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const listSMSCs = async (perPage) =>
    {
        try {
            return (await api.get("/smsc?" + qs.stringify({take: perPage}))).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const updateSMSC = async (smscID, data) =>
    {
        try {
            return (await api.put("/smsc/" + smscID , data)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const deleteSMSC = async (smscID) =>
    {
        try {
            return (await api.delete("/smsc/" + smscID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }
    
    const searchSMSC = async (take, column, value) =>
    {
        try {
            return (await api.post("/smsc/search?" + qs.stringify({take: take}), {column: column, value: value})).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const getOperator = async (operatorID) =>
    {
        try {
            return (await api.get("/operator/" + operatorID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const addOperator = async (operator) =>
    {
        try {
            return (await api.post("/operator", operator)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const listOperators = async (perPage) =>
    {
        try {
            return (await api.get("/operator?" + qs.stringify({take: perPage}))).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const updateOperator = async (operatorID, data) =>
    {
        try {
            return (await api.put("/operator/" + operatorID , data)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const deleteOperator = async (operatorID) =>
    {
        try {
            return (await api.delete("/operator/" + operatorID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }
    
    const searchOperator = async (take, column, value) =>
    {
        try {
            return (await api.post("/operator/search?" + qs.stringify({take: take}), {column: column, value: value})).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const getSMSCBinding = async (smscBindingID) =>
    {
        try {
            return (await api.get("/smsc-binding/" + smscBindingID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const addSMSCBinding = async (smscBinding) =>
    {
        try {
            return (await api.post("/smsc-binding", smscBinding)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const listSMSCBindings = async (perPage) =>
    {
        try {
            return (await api.get("/smsc-binding?" + qs.stringify({take: perPage}))).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const updateSMSCBinding = async (smscBindingID, data) =>
    {
        try {
            return (await api.put("/smsc-binding/" + smscBindingID , data)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const deleteSMSCBinding = async (smscBindingID) =>
    {
        try {
            return (await api.delete("/smsc-binding/" + smscBindingID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }
    
    const searchSMSCBinding = async (take, column, value) =>
    {
        try {
            return (await api.post("/smsc-binding/search?" + qs.stringify({take: take}), {column: column, value: value})).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const getSender = async (senderID) =>
    {
        try {
            return (await api.get("/sender/" + senderID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const addSender = async (sender) =>
    {
        try {
            return (await api.post("/sender", sender)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const listSenders = async (perPage) =>
    {
        try {
            return (await api.get("/sender?" + qs.stringify({take: perPage}))).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const getClientSenders = async (userID) =>
    {
        try {
            return (await api.get("/client/" + userID + "/senders")).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const updateSender = async (senderID, data) =>
    {
        try {
            return (await api.put("/sender/" + senderID , data)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const deleteSender = async (senderID) =>
    {
        try {
            return (await api.delete("/sender/" + senderID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }
    
    const searchSender = async (take, column, value) =>
    {
        try {
            return (await api.post("/sender/search?" + qs.stringify({take: take}), {column: column, value: value})).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const getSenderConnection = async (senderConnectionID) =>
    {
        try {
            return (await api.get("/sender-connection/" + senderConnectionID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const getSenderConnections = async (senderID) =>
    {
        try {
            return (await api.get("/sender/" + senderID + "/connections")).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const addSenderConnection = async (senderConnection) =>
    {
        try {
            return (await api.post("/sender-connection", senderConnection)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const listSendersConnections = async (perPage) =>
    {
        try {
            return (await api.get("/sender-connection?" + qs.stringify({take: perPage}))).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const updateSenderConnection = async (senderConnectionID, data) =>
    {
        try {
            return (await api.put("/sender-connection/" + senderConnectionID , data)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const deleteSenderConnection = async (senderConnectionID) =>
    {
        try {
            return (await api.delete("/sender-connection/" + senderConnectionID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }
    
    const searchSenderConnection = async (take, column, value) =>
    {
        try {
            return (await api.post("/sender-connection/search?" + qs.stringify({take: take}), {column: column, value: value})).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const getMessage = async (messageID) =>
    {
        try {
            return (await api.get("/message/" + messageID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const addMessage = async (message) =>
    {
        try {
            return (await api.post("/message", message)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const bulkAddMessages = async (messages) =>
    {
        try {
            return (await api.post("/message/bulk-add", messages)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const listMessages = async (perPage) =>
    {
        try {
            return (await api.get("/message?" + qs.stringify({take: perPage}))).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const updateMessage = async (messageID, data) =>
    {
        try {
            return (await api.put("/message/" + messageID , data)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const deleteMessage = async (messageID) =>
    {
        try {
            return (await api.delete("/message/" + messageID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }
    
    const searchMessage = async (take, column, value) =>
    {
        try {
            return (await api.post("/message/search?" + qs.stringify({take: take}), {column: column, value: value})).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const getMessageLanguage = async (messageLanguageID) =>
    {
        try {
            return (await api.get("/message-language/" + messageLanguageID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const addMessageLanguage = async (messageLanguage) =>
    {
        try {
            return (await api.post("/message-language", messageLanguage)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const listMessageLanguages = async (perPage) =>
    {
        try {
            return (await api.get("/message-language?" + qs.stringify({take: perPage}))).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const updateMessageLanguage = async (messageLanguageID, data) =>
    {
        try {
            return (await api.put("/message-language/" + messageLanguageID , data)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const deleteMessageLanguage = async (messageLanguageID) =>
    {
        try {
            return (await api.delete("/message-language/" + messageLanguageID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }
    
    const searchMessageLanguage = async (take, column, value) =>
    {
        try {
            return (await api.post("/message-language/search?" + qs.stringify({take: take}), {column: column, value: value})).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const listMessageSegments = async (perPage) =>
    {
        try {
            return (await api.get("/message-segment?" + qs.stringify({take: perPage}))).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const searchMessageSegment = async (take, column, value) =>
    {
        try {
            return (await api.post("/message-segment/search?" + qs.stringify({take: take}), {column: column, value: value})).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const listMessageRecipients = async (perPage) =>
    {
        try {
            return (await api.get("/message-recipient?" + qs.stringify({take: perPage}))).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const searchMessageRecipient = async (take, column, value) =>
    {
        try {
            return (await api.post("/message-recipient/search?" + qs.stringify({take: take}), {column: column, value: value})).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const getMessageGroup = async (messageGroupID) =>
    {
        try {
            return (await api.get("/message-group/" + messageGroupID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const getClientMessageGroups = async (userID) =>
    {
        try {
            return (await api.get("/client/" + userID + "/message-groups")).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const addMessageGroup = async (messageGroup) =>
    {
        try {
            return (await api.post("/message-group", messageGroup)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const listMessageGroups = async (perPage) =>
    {
        try {
            return (await api.get("/message-group?" + qs.stringify({take: perPage}))).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const updateMessageGroup = async (messageGroupID, data) =>
    {
        try {
            return (await api.put("/message-group/" + messageGroupID , data)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const deleteMessageGroup = async (messageGroupID) =>
    {
        try {
            return (await api.delete("/message-group/" + messageGroupID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }
    
    const searchMessageGroup = async (take, column, value) =>
    {
        try {
            return (await api.post("/message-group/search?" + qs.stringify({take: take}), {column: column, value: value})).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const getMessageGroupRecipient = async (messageGroupRecipientID) =>
    {
        try {
            return (await api.get("/message-group-recipient/" + messageGroupRecipientID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const addMessageGroupRecipient = async (messageGroupRecipient) =>
    {
        try {
            return (await api.post("/message-group-recipient", messageGroupRecipient)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const listMessageGroupRecipients = async (perPage) =>
    {
        try {
            return (await api.get("/message-group-recipient?" + qs.stringify({take: perPage}))).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const updateMessageGroupRecipient = async (messageGroupRecipientID, data) =>
    {
        try {
            return (await api.put("/message-group-recipient/" + messageGroupRecipientID , data)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const deleteMessageGroupRecipient = async (messageGroupRecipientID) =>
    {
        try {
            return (await api.delete("/message-group-recipient/" + messageGroupRecipientID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }
    
    const searchMessageGroupRecipient = async (take, column, value) =>
    {
        try {
            return (await api.post("/message-group-recipient/search?" + qs.stringify({take: take}), {column: column, value: value})).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const getMessageFilter = async (messageFilterID) =>
    {
        try {
            return (await api.get("/message-filter/" + messageFilterID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const addMessageFilter = async (messageFilter) =>
    {
        try {
            return (await api.post("/message-filter", messageFilter)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const listMessageFilters = async (perPage) =>
    {
        try {
            return (await api.get("/message-filter?" + qs.stringify({take: perPage}))).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const updateMessageFilter = async (messageFilterID, data) =>
    {
        try {
            return (await api.put("/message-filter/" + messageFilterID , data)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const deleteMessageFilter = async (messageFilterID) =>
    {
        try {
            return (await api.delete("/message-filter/" + messageFilterID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }
    
    const searchMessageFilter = async (take, column, value) =>
    {
        try {
            return (await api.post("/message-filter/search?" + qs.stringify({take: take}), {column: column, value: value})).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }




    return {

        getAdmin,

        addAdmin,

        listAdmins,

        updateAdmin,

        deleteAdmin,

        searchAdmin,

        addSales,

        listSales,

        updateSales,

        deleteSales,

        getClient,

        addClient,

        listClients,

        updateClient,

        deleteClient,

        searchClient,

        getClientOrders,

        getClientLatestOrder,

        addPricelist,

        listPricelists,

        updatePricelist,

        deletePricelist,

        addBusinessField,

        listBusinessFields,

        updateBusinessField,

        deleteBusinessField,

        getCountry,

        addCountry,

        listCountries,

        updateCountry,

        deleteCountry,

        searchCountry,

        getSMSC,

        addSMSC,

        listSMSCs,

        updateSMSC,

        deleteSMSC,

        searchSMSC,

        getOperator,

        addOperator,

        listOperators,

        updateOperator,

        deleteOperator,

        searchOperator,

        getSMSCBinding,

        addSMSCBinding,

        listSMSCBindings,

        updateSMSCBinding,

        deleteSMSCBinding,

        searchSMSCBinding,

        getSender,

        addSender,

        listSenders,

        getClientSenders,

        updateSender,

        deleteSender,

        searchSender,

        getSenderConnection,

        getSenderConnections,

        addSenderConnection,

        listSendersConnections,

        updateSenderConnection,

        deleteSenderConnection,

        searchSenderConnection,

        getMessage,

        addMessage,

        bulkAddMessages,

        listMessages,

        updateMessage,

        deleteMessage,

        searchMessage,

        getMessageLanguage,

        addMessageLanguage,

        listMessageLanguages,

        updateMessageLanguage,

        deleteMessageLanguage,

        searchMessageLanguage,

        listMessageSegments,

        searchMessageSegment,

        listMessageRecipients,

        searchMessageRecipient,

        getMessageGroup,

        getClientMessageGroups,

        addMessageGroup,

        listMessageGroups,

        updateMessageGroup,

        deleteMessageGroup,

        searchMessageGroup,

        getMessageGroupRecipient,

        addMessageGroupRecipient,

        listMessageGroupRecipients,

        updateMessageGroupRecipient,

        deleteMessageGroupRecipient,

        searchMessageGroupRecipient,

        getMessageFilter,

        addMessageFilter,

        listMessageFilters,

        updateMessageFilter,

        deleteMessageFilter,

        searchMessageFilter,

    }
}

export default useCoreApi