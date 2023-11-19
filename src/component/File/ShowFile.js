import Document from "../../layout/Shared/Document"
import Page from "../../page/Page"

const ShowFile = ({ file  }) => {

    return <Page title="Show File">
        <Document imageUrl={file.url}/>
    </Page>
}

export default ShowFile