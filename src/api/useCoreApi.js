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

        addPricelist,

        listPricelists,

        updatePricelist,

        deletePricelist,

        addBusinessField,

        listBusinessFields,

        updateBusinessField,

        deleteBusinessField,
    }
}

export default useCoreApi