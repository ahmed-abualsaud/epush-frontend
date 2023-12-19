import { useEffect, useRef } from "react"
import NavBar from "../../layout/Navigation/NavBar"
import { render } from "../../setup/navigator"
import Page from "../../page/Page"

const ClientFileManagement = () => {

    const setupLock = useRef(true)
    const setup = async () => {
        render("client-file-management", "upload-file")
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const renderAddClientFile = () => {
        render("client-file-management", "upload-file")
    }

    const renderListClientFiles = () => {
        render("client-file-management", "client-files")
    }

    return (
        <Page className="m-0">
            <NavBar>
                <div onClick={renderAddClientFile}><i class="fas fa-file-arrow-up"></i>Upload Document</div>
                <div onClick={renderListClientFiles}><i className="fas fa-folder-tree"></i>My Documents</div>
            </NavBar>

            <div id="client-file-management"></div>

        </Page>
    )
}

export default ClientFileManagement