import useCoreApi from "../../api/useCoreApi"
import { useEffect, useRef, useState } from "react"
import { isEmpty, snakeToBeautifulCase } from "../../utils/helper"
import { showAlert } from "../../utils/validator"
import Page from "../../page/Page"

const EditCountry = ({ country }) => {

    const excludedColumns = ["id", "created_at", "updated_at"]

    const filteredColumns = Object.keys(country).filter(
        (column) => !excludedColumns.includes(column)
    )

    const { updateCountry } = useCoreApi()
    const [currentCountry, setCurrentCountry] = useState([])

    const setupLock = useRef(true)
    const setup = () => {
        setCurrentCountry(country)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const updateSpecificCountry = async () => {
        let query = ""
        filteredColumns.forEach((column) => {
            query += "#" + column + "-country-input, "
        })

        let countryInfoInput = document.querySelectorAll(query.substring(0, query.length - 2))

        let data = {}
        countryInfoInput.forEach(usrInp => ! isEmpty(usrInp.value) && (data[usrInp.id.split("-")[0]] = usrInp.value))
        isEmpty(data) && showAlert("You need to insert new country information")

        if (! isEmpty(data)) {
            let newCountry = await updateCountry(country.id, data)
            if (! isEmpty(newCountry)) {
                setCurrentCountry(newCountry)
                showAlert("Country information updated successfully");
            }
        }
    }



    return (
        <Page title="Country Information">
            <table className="fl-table">
                <thead>
                    <tr>
                    <th>Attribute Name</th>
                    <th>Current Value</th>
                    <th>New Value</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredColumns?.map((column) => (
                        <tr>
                            <td>{ column }</td>
                            <td>{ typeof currentCountry[column] === "boolean"? currentCountry[column] ? "Yes" : "No" : currentCountry[column] ?? "NULL"}</td>
                            <td className="info-input"> {
                                <input id={column + "-country-input"} placeholder={ "Type the new " + snakeToBeautifulCase(column) + " here"} type="text"/>
                            }</td>
                        </tr>
                    ))}
                    <tr>
                        <td className="last-row" colSpan={3}></td>
                    </tr>
                </tbody>
            </table>

            <div className="button-container">
                <button className="button" onClick={() => updateSpecificCountry()}>Update Country</button>
            </div>
        </Page>
    )
}

export default EditCountry