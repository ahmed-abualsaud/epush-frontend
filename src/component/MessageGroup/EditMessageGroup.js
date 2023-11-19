import useCoreApi from "../../api/useCoreApi"
import { useEffect, useRef, useState } from "react"
import { isEmpty, snakeToBeautifulCase } from "../../utils/helper"
import { showAlert } from "../../utils/validator"
import ListMessageGroupRecipients from "../MessageGroupRecipient/ListMessageGroupRecipients"
import Page from "../../page/Page"

const EditMessageGroup = ({ messageGroup }) => {

    const filteredColumns = ["name"]

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
        <Page title="Message Group Information">
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
        </Page>
    )
}

export default EditMessageGroup