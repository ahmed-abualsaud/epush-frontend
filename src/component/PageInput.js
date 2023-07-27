import '../assets/style/component/page-input.css'
import { isEmpty } from "../utils/helper"

const PageInput = ({ url, numberOfPages, setPageHandler }) => {

    const onKeyDownHandler = (e) => {
        if (e.key === 'Enter' && 
            ! isEmpty(e.currentTarget.value) && 
            ! isNaN(e.currentTarget.value) && 
            parseInt(e.currentTarget.value) <= numberOfPages
        ){
            setPageHandler(url + "&page=" + e.currentTarget.value)
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