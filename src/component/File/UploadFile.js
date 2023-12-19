import { useEffect, useRef, useState } from "react"
import useFileApi from "../../api/useFileApi"
import Document from "../../layout/Shared/Document"
import DropList from "../../layout/Shared/DropList"
import Page from "../../page/Page"
import { useSelector } from "react-redux"
import { isEmpty } from "../../utils/helper"
import { showAlert } from "../../utils/validator"

const UploadFile = () => {

    const [folders, setFolders] = useState([])
    const [document, setDocument] = useState({})
    const [selectedFolder, setSelectedFolder] = useState({})

    const { listFolders, addFile } = useFileApi()
    const user = useSelector(state => state.auth.user)

    const setupLock = useRef(true)
    const setup = async () => {
        const fld = await listFolders(1000000000000000)
        if (fld.data) setFolders(fld.data)


        setSelectedFolder(fld.data.find(f => f.name === "DLR"))
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const onSelectDocument = (doc) => {
        setDocument(doc)
    }

    const onSelectFolder = (folderName) => {
        setSelectedFolder(folders.find(f => f.name === folderName))
    }

    const upload = async () => {

        if (isEmpty(document)) {
            showAlert("Please Upload a Document")
            return
        }

        if (isEmpty(selectedFolder)) {
            showAlert("Please Select a Folder")
            return
        }

        let doc = new FormData();
        doc.append("user_id", user?.user?.id)
        doc.append("folder_id", selectedFolder.id)
        doc.append('file', document)

        const result = await addFile(doc)
        if (! isEmpty(result)) {
            showAlert("File Uploaded Successfully")
        }
    }

    return (
        <Page title={user?.roles[0].name === "client" ? null : "Upload Document"} style={user?.roles[0].name === "client" ? {border: "none"} : {}}>
            <Document onSelectDocument={onSelectDocument}/>
            {/* <div className="d-flex justify-content-center">
                <div className="d-inline-flex justify-content-center" style={{width: "51vw"}}>
                    <DropList selectName="Select Folder" options={folders.map(folder => folder.name)} onSelect={onSelectFolder}/>
                </div>
            </div> */}

            <div className="button-container">
                <button className="button" onClick={() => upload()}>Upload</button>
            </div>
            <div style={{height: "80px", visibility: "hidden"}}></div>
        </Page>
    )
}

export default UploadFile