import qs from "qs"
import useAxiosApi from "./Api"

const useExpenseApi = () => 
{

    const { api, handleErrorResponse } = useAxiosApi()

    const listPaymentMethods = async () =>
    {
        try {
            return (await api.get("/expense/payment-method")).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const addPaymentMethod = async (data) =>
    {
        try {
            return (await api.post("/expense/payment-method", data)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const updatePaymentMethod = async (paymentMethodID, data) =>
    {
        try {
            return (await api.put("/expense/payment-method/" + paymentMethodID, data)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const deletePaymentMethod = async (paymentMethodID) =>
    {
        try {
            return (await api.delete("/expense/payment-method/" + paymentMethodID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const getOrder = async (orderID) =>
    {
        try {
            return (await api.get("/expense/order/" + orderID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const listOrders = async (perPage) =>
    {
        try {
            return (await api.get("/expense/order?" + qs.stringify({take: perPage}))).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const addOrder = async (order) =>
    {
        try {
            return (await api.post("/expense/order", order)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const updateOrder = async (orderID, data) =>
    {
        try {
            return (await api.put("/expense/order/" + orderID, data)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const searchOrder = async (take, column, value) =>
    {
        try {
            return (await api.post("/expense/order/search?" + qs.stringify({take: take}), {column: column, value: value})).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }


    return {

        getOrder,

        addOrder,

        updateOrder,

        listOrders,

        searchOrder,

        addPaymentMethod,

        listPaymentMethods,

        updatePaymentMethod,

        deletePaymentMethod,
    }
}

export default useExpenseApi