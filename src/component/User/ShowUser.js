import { useEffect, useRef, useState } from "react";
import useAuthApi from "../../api/useAuthApi";
import Avatar from "../../layout/Shared/Avatar";
import { snakeToBeautifulCase } from "../../utils/helper";
import Page from "../../page/Page";

const ShowUser = ({ user }) => {

    const [currentUser, setCurrentUser] = useState([])
    const { getUser } = useAuthApi()

    const filteredColumns = user ? Object.keys(user) : []

    const setupLock = useRef(true)
    const setup = async () => {
        const clt = await getUser(user.id)
        if (clt) setCurrentUser(clt)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])


    return (
        <Page title="General Information">
            <Avatar imageUrl={currentUser.avatar}/>
            
            <table className="fl-table">
                <thead>
                    <tr>
                        <th>Attribute Name</th>
                        <th>Attribute Value</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredColumns.map((col) => (
                        <tr>
                            <td style={{fontSize: "22px", whiteSpace: "no-wrap"}}>{snakeToBeautifulCase(col)}</td>
                            <td style={{fontSize: "22px"}} key={ col + "-show-user-info" }>{ typeof currentUser[col] === "boolean"? currentUser[col] ? "Yes" : "No" : currentUser[col] ?? "NULL"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Page>
    )
}

export default ShowUser