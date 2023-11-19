import { useEffect, useRef, useState } from "react"
import useFileApi from "../../api/useFileApi"
import Document from "../../layout/Shared/Document"
import Page from "../../page/Page"
import { useSelector } from "react-redux"
import { isEmpty } from "../../utils/helper"
import { showAlert } from "../../utils/validator"
import { navigate } from "../../setup/navigator"
import useCoreApi from "../../api/useCoreApi"
import DropList from "../../layout/Shared/DropList"

const UploadFileToFolder = ({ folder }) => {

    const [clients, setClients] = useState([])
    const [document, setDocument] = useState({})
    const [selectedClient, setSelectedClient] = useState({})

    const { addFile } = useFileApi()
    const { listClients } = useCoreApi()
    const user = useSelector(state => state.auth.user)

    const setupLock = useRef(true)
    const setup = async () => {
        const clt = await listClients(1000000000000000)
        if (clt.data) setClients(clt.data)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const onSelectDocument = (doc) => {
        setDocument(doc)
    }

    const onSelectClient = (companyName) => {
        setSelectedClient(clients.find(c => c.company_name === companyName))
    }

    const upload = async () => {

        if (isEmpty(document)) {
            showAlert("Please Upload a Document")
            return
        }

        if (isEmpty(selectedClient)) {
            showAlert("Please Select a Company")
            return
        }

        let doc = new FormData();
        doc.append("user_id", selectedClient.user_id)
        doc.append("folder_id", folder.id)
        doc.append('file', document)

        const result = await addFile(doc)
        if (! isEmpty(result)) {
            navigate("content", "get-folder-files", folder)
            showAlert("File Uploaded Successfully")
        }
    }

    return (
        <Page title={"Upload File To " + folder.name}>
            <Document onSelectDocument={onSelectDocument}/>
            <div className="d-flex justify-content-center">
                <div className="d-inline-flex justify-content-center" style={{width: "51vw"}}>
                    <DropList selectName="Select Company" options={clients.map(client => client.company_name)} onSelect={onSelectClient}/>
                </div>
            </div>

            <div className="button-container">
                <button className="button" onClick={() => upload()}>Upload</button>
            </div>
            <div style={{height: "80px", visibility: "hidden"}}></div>
        </Page>
    )
}

export default UploadFileToFolder