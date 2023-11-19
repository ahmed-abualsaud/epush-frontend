import qs from "qs"
import useAxiosApi from "./Api"
import { getFileNameFromResponseHeaders } from '../utils/helper'

const useFileApi = () => 
{

    const { api, handleErrorResponse } = useAxiosApi()

    const getFile = async (fileID) =>
    {
        try {
            return (await api.get("/file/" + fileID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const addFile = async (file) =>
    {
        try {
            return (await api.post("/file", file, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
            })).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const listFiles = async (perPage) =>
    {
        try {
            return (await api.get("/file?" + qs.stringify({take: perPage}))).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const updateFile = async (fileID, data) =>
    {
        try {
            return (await api.put("/file/" + fileID , data)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const deleteFile = async (fileID) =>
    {
        try {
            return (await api.delete("/file/" + fileID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }
    
    const searchFile = async (take, column, value) =>
    {
        try {
            return (await api.post("/file/search?" + qs.stringify({take: take}), {column: column, value: value})).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const exportPDF = async (columns, rows) => {
        try {
            let response = await api.post("/file/export/pdf", { columns: columns, rows: rows },{
                responseType: 'blob',
            })
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', getFileNameFromResponseHeaders(response.headers))
            link.addEventListener('click', () => {link.remove()})
            document.body.appendChild(link)
            link.click()

        } catch (error) {
          return handleErrorResponse(error)
        }
    }
      
    const exportExcel = async (columns, rows) => {
      try {
          let response = await api.post("/file/export/excel", { columns: columns, rows: rows },{
              responseType: 'blob',
          })
      
          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', getFileNameFromResponseHeaders(response.headers))
          link.addEventListener('click', () => {link.remove()})
          document.body.appendChild(link)
          link.click()

      } catch (error) {
        return handleErrorResponse(error)
      }
    }

    const getFolder = async (folderID) =>
    {
        try {
            return (await api.get("/folder/" + folderID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const addFolder = async (folder) =>
    {
        try {
            return (await api.post("/folder", folder)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const listFolders = async (perPage) =>
    {
        try {
            return (await api.get("/folder?" + qs.stringify({take: perPage}))).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const updateFolder = async (folderID, data) =>
    {
        try {
            return (await api.put("/folder/" + folderID , data)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const deleteFolder = async (folderID) =>
    {
        try {
            return (await api.delete("/folder/" + folderID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }
    
    const searchFolder = async (take, column, value) =>
    {
        try {
            return (await api.post("/folder/search?" + qs.stringify({take: take}), {column: column, value: value})).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const getFolderFiles = async (folderID) =>
    {
        try {
            return (await api.get("/folder/" + folderID + "/files")).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }


    return {

      getFile,

      addFile,

      listFiles,

      updateFile,

      deleteFile,

      searchFile,

      exportExcel,

      exportPDF,

      getFolder,

      addFolder,

      listFolders,

      updateFolder,

      deleteFolder,

      searchFolder,

      getFolderFiles
    }
}

export default useFileApi