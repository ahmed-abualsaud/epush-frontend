import useCoreApi from "../../api/useCoreApi"
import { useEffect, useRef, useState } from "react"
import { isEmpty, snakeToBeautifulCase } from "../../utils/helper"
import { showAlert } from "../../utils/validator"
import ListMessageGroupRecipients from "../MessageGroupRecipient/ListMessageGroupRecipients"

const EditMessageGroup = ({ messageGroup }) => {

    const excludedColumns = ["id", "created_at", "updated_at", "recipients", "client", "company_name", "user_id"]

    const filteredColumns = Object.keys(messageGroup).filter(
        (column) => !excludedColumns.includes(column)
    )

    const { updateMessageGroup } = useCoreApi()
    const [currentMessageGroup, setCurrentMessageGroup] = useState([])

    const setupLock = useRef(true)
    const setup = () => {
        setCurrentMessageGroup(messageGroup)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const updateSpecificMessageGroup = async () => {
        let query = ""
        filteredColumns.forEach((column) => {
            query += "#" + column + "-message-group-input, "
        })

        let messageGroupInfoInput = document.querySelectorAll(query.substring(0, query.length - 2))

        let data = {}
        messageGroupInfoInput.forEach(usrInp => ! isEmpty(usrInp.value) && (data[usrInp.id.split("-")[0]] = usrInp.value))
        isEmpty(data) && showAlert("You need to insert new message group information")

        if (! isEmpty(data)) {
            let newMessageGroup = await updateMessageGroup(messageGroup.id, data)
            if (! isEmpty(newMessageGroup)) {
                setCurrentMessageGroup(newMessageGroup)
                showAlert("Message Group information updated successfully");
            }
        }
    }



    return (
        <div className="component-container">
            <h1 className="content-header mb-5">Message Group Information</h1>
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
                            <td>{ typeof currentMessageGroup[column] === "boolean"? currentMessageGroup[column] ? <i class="fa-solid fa-check"></i> : <i class="fa-solid fa-xmark"></i> : currentMessageGroup[column] ?? "NULL"}</td>
                            <td className="info-input"> {
                                <input id={column + "-message-group-input"} placeholder={ "Type the new " + snakeToBeautifulCase(column) + " here"} type="text"/>
                            }</td>
                        </tr>
                    ))}
                    <tr>
                        <td className="last-row" colSpan={3}></td>
                    </tr>
                </tbody>
            </table>

            <div className="button-container">
                <button className="button" onClick={() => updateSpecificMessageGroup()}>Update Message Group</button>
            </div>

            <ListMessageGroupRecipients messageGroup={messageGroup}/>
        </div>
    )
}

export default EditMessageGroup