import '../assets/style/component/page-input.css'
import { isEmpty } from "../utils/helper"

const PageInput = ({ url, entity, setPageHandler }) => {

    const onKeyDownHandler = (e) => {
        if (e.key === 'Enter' && ! isEmpty(e.currentTarget.value) && ! isNaN(e.currentTarget.value)) {
            setPageHandler(url + "&page=" + e.currentTarget.value, entity)
        }
    }

    return (
        <div className="page-input-div">
            got to page
            <input className="page-input-input" type="number" onKeyDown={onKeyDownHandler}/>
        </div>
    )
}

export default PageInput