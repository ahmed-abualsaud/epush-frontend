import useAxiosApi from "./Api"
import { getFileNameFromResponseHeaders } from '../utils/helper'

const useFileApi = () => 
{

    const { api, handleErrorResponse } = useAxiosApi()

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


    return {


        exportExcel,

        exportPDF,
    }
}

export default useFileApi