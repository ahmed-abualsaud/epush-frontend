import { randomString } from "../../utils/strUtils"

const HeadRow = ({ children }) => {

    return (
        <tr key={"head-" + randomString(5)}>
            <th key="#">#</th>
            { children }
        </tr>
    )
}

export default HeadRow