import qs from "qs"
import useAxiosApi from "./Api"

const useQueueApi = () => 
{
    const { api, handleErrorResponse } = useAxiosApi()

    const checkQueueEnabled = async (queue) =>
    {
        try {
            return (await api.get("/queue/check/" + queue)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const checkQueuesEnabled = async (queues) =>
    {
        try {
            return (await api.post("/queue/check", {queues: queues})).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const enableDisableQueue = async (queue, enabled) =>
    {
        try {
            return (await api.post("/queue/" + queue, {enabled: enabled})).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const enableDisableQueues = async (queues, enabled) =>
    {
        try {
            return (await api.post("/queue", {enabled: enabled, queues: queues})).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const getQueueJob = async (queueID) =>
    {
        try {
            return (await api.get("/queue/job/" + queueID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const getQueueFailedJob = async (queueID) =>
    {
        try {
            return (await api.get("/queue/failed-job/" + queueID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const getQueueJobs = async (queue, perPage) =>
    {
        try {
            return (await api.get("/queue/" + queue + "/jobs?" + qs.stringify({take: perPage}))).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const getQueueFailedJobs = async (queue, perPage) =>
    {
        try {
            return (await api.get("/queue/" + queue + "/failed-jobs?" + qs.stringify({take: perPage}))).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const searchQueueJob = async (queue, take, column, value) =>
    {
        try {
            return (await api.post("/queue/" + queue + "/jobs/search?" + qs.stringify({take: take}), {column: column, value: value})).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const searchQueueFailedJob = async (queue, take, column, value) =>
    {
        try {
            return (await api.post("/queue/" + queue + "/failed-jobs/search?" + qs.stringify({take: take}), {column: column, value: value})).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }


    return {

        getQueueJob,

        getQueueJobs,

        searchQueueJob,

        getQueueFailedJob,

        getQueueFailedJobs,

        searchQueueFailedJob,

        checkQueueEnabled,

        checkQueuesEnabled,

        enableDisableQueue,

        enableDisableQueues

    }
}

export default useQueueApi