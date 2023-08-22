import { useEffect, useRef, useState } from "react";
import useCoreApi from "../../api/useCoreApi";

const ShowCountry = ({ country }) => {

    const [currentCountry, setCurrentCountry] = useState([])
    const { getCountry } = useCoreApi()

    const filteredColumns = country ? Object.keys(country) : []

    const setupLock = useRef(true)
    const setup = async () => {
        const clt = await getCountry(country.id)
        if (clt) setCurrentCountry(clt)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])


    return (
        <div className="add-user-container">
            <h1 className="add-user-header">General Information</h1>
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
                            <td style={{fontSize: "22px"}}>{col}</td>
                            <td style={{fontSize: "22px"}} key={ col + "-show-user-info" }>{ typeof currentCountry[col] === "boolean"? currentCountry[col] ? "Yes" : "No" : currentCountry[col] ?? "NULL"}</td>
                        </tr>
                    ))}
                    <tr key="last-row">
                        <td className="last-row" colSpan={2}></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ShowCountry