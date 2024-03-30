import useCoreApi from "../../api/useCoreApi"
import { showAlert } from "../../utils/validator"
import { isEmpty } from "../../utils/helper"
import Page from "../../page/Page"
import { useState } from "react"
import Document from "../../layout/Shared/Document"

const AddBanner = () => {

    const { addBanner } = useCoreApi()
    const [document, setDocument] = useState({})

    const onSelectDocument = (doc) => {
        setDocument(doc)
    }

    const upload = async () => {

        if (isEmpty(document)) {
            showAlert("Please Upload a Document")
            return
        }

        let doc = new FormData();
        doc.append('image', document)

        const result = await addBanner(doc)
        if (! isEmpty(result)) {
            showAlert("File Uploaded Successfully")
        }
    }

    return (
        <Page id="add-banner-form" title="Add New Banner">

            <Document onSelectDocument={onSelectDocument}/>

            <div className="button-container">
                <button className="button" onClick={() => upload()}>Add New Banner</button>
            </div>
        </Page>
    )
}

export default AddBanner