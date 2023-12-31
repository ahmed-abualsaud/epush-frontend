import { isEmpty } from "../../utils/helper"
import { randomString } from "../../utils/strUtils"

const HeadRow = ({ children }) => {

    children = children ? ([1, undefined].includes(children.length) ? [children] : children) : []

    return (
        // (children.length >= 1 && isEmpty(children[0].props?.columns)) ? 
        // <tr><th className="th-nowrap" key={"head-no-data"}>Table</th></tr> :
        <tr key={"head-" + randomString(5)}>
            <th key="#">#</th>
            { children }
        </tr>
    )
}

export default HeadRow