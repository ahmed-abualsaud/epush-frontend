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


    return {

        addPaymentMethod,

        listPaymentMethods,

        updatePaymentMethod,

        deletePaymentMethod,
    }
}

export default useExpenseApi