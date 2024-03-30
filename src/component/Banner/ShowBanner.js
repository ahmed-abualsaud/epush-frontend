import Document from '../../layout/Shared/Document'
import Page from '../../page/Page'

const ShowBanner = ({ banner }) => {

    return <Page title="Show Banner">
        <Document imageUrl={banner.image}/>
    </Page>

}

export default ShowBanner