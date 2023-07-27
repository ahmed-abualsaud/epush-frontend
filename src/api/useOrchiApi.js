import useAxiosApi from "./Api"

const useOrchiApi = () => 
{

  const { api, handleErrorResponse } = useAxiosApi()


  const listServices = async () => 
  {
    try {
      return (await api.get("/orchi/service"))?.data?.data

    } catch (error) {
      return handleErrorResponse(error)
    }
  }

  const getServiceContexts = async (serviceID) => 
  {
    try {
      return (await api.get("/orchi/service/" + serviceID + "/contexts"))?.data?.data

    } catch (error) {
      return handleErrorResponse(error)
    }
  }

  const getContextHandleGroups = async (contextID) => 
  {
    try {
      return (await api.get("/orchi/context/" + contextID + "/handle-groups"))?.data?.data

    } catch (error) {
      return handleErrorResponse(error)
    }
  }

  const getHandleGroupHandlers = async (handleGroupID) => 
  {
    try {
      return (await api.get("/orchi/handle-group/" + handleGroupID + "/handlers"))?.data?.data

    } catch (error) {
      return handleErrorResponse(error)
    }
  }

  const updateHandler = async (handlerID, data) => 
  {
    try {
      return (await api.put("/orchi/handler/" + handlerID, data))?.data?.data

    } catch (error) {
      return handleErrorResponse(error)
    }
  }

  const updateHandleGroup = async (handleGroupID, data) => 
  {
    try {
      return (await api.put("/orchi/handle-group/" + handleGroupID, data))?.data?.data

    } catch (error) {
      return handleErrorResponse(error)
    }
  }

  const updateContext = async (contextID, data) =>
  {
    try {
      return (await api.put("/orchi/context/" + contextID, data))?.data?.data

    } catch (error) {
      return handleErrorResponse(error)
    }
  }

  const updateService = async (serviceID, data) =>
  {
    try {
      return (await api.put("/orchi/service/" + serviceID, data))?.data?.data

    } catch (error) {
      return handleErrorResponse(error)
    }
  }


  return { 
    listServices,

    updateService,

    updateContext,

    updateHandler,

    updateHandleGroup,

    getServiceContexts,

    getContextHandleGroups,

    getHandleGroupHandlers
  }
}

export default useOrchiApi