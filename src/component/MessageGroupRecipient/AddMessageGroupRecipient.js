import Input from "../../layout/Shared/Input"
import useCoreApi from "../../api/useCoreApi"
import { showAlert, validate } from "../../utils/validator"
import { getElement, getFormInputData } from "../../utils/dom"
import { navigate } from "../../setup/navigator"
import { isEmpty } from "../../utils/helper"
import { useEffect, useRef, useState } from "react"
import DropList from "../../layout/Shared/DropList"

const AddMessageGroupRecipient = () => {

    const { listMessageGroups, addMessageGroupRecipient } = useCoreApi()

    const [attributes, setAttributes] = useState([])
    const [messageGroups, setMessageGroups] = useState([])
    const [selectedGroupID, setSelectedGroupID] = useState('')
    const [recipientAttributes, setRecipientAttributes] = useState([
        { id: 0, name: '', value: '' }
    ])

    const setupLock = useRef(true)
    const setup = async () => {
        const msgrp = await listMessageGroups(1000000000000)
        if (msgrp?.data) setMessageGroups(msgrp.data)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const handleFocus = (id) => {
        if (id === recipientAttributes.length - 1) {
            setRecipientAttributes([...recipientAttributes, { id: id + 1, name: '', value: '' }])
        }
    }

    const handleNameChange = (id, event) => {
        const newrecipientAttributes = [...recipientAttributes]
        newrecipientAttributes[id].name = event.target.value
        setRecipientAttributes(newrecipientAttributes)
        let attr = newrecipientAttributes.map(attr => ({name: attr.name, value: attr.value}))
        attr.pop()
        setAttributes(attr)
        getElement("delete-attribute-button-" + id).classList.remove("d-none")
    }

    const handleValueChange = (id, event) => {
        const newrecipientAttributes = [...recipientAttributes]
        newrecipientAttributes[id].value = event.target.value
        setRecipientAttributes(newrecipientAttributes)
        let attr = newrecipientAttributes.map(attr => ({name: attr.name, value: attr.value}))
        attr.pop()
        setAttributes(attr)    }

    const addNewMessageGroupRecipient = async () => {

        if (validate("add-message-group-recipient-form")) {

            if (isEmpty(selectedGroupID)) {
                showAlert("Please select a message group")
                return
            }

            attributes.forEach(attr => {
                if (isEmpty(attr.value)) {
                    showAlert("Attribute with name '" + attr.name + "' should have a value")
                    return
                }
                if (isEmpty(attr.name)) {
                    showAlert("Attribute with value '" + attr.value + "' should have a name")
                    return
                }
            })

            const messageGroupRecipient = {
                message_group_id: selectedGroupID,
                recipients: [{
                    number: getElement("add-message-group-recipient-number")?.value,
                    attributes: JSON.stringify(attributes)
                }]
            }

            const result = await addMessageGroupRecipient(messageGroupRecipient);
            if (! isEmpty(result)) {
                navigate("content", "list-message-group-recipients")
                showAlert("Message Group Recipient Added Successfully!")
            } else {
                showAlert("Valid Message Group Recipient Information Required")
            }
        }
    }

    const onSelectGroup = async (option) => {
        setSelectedGroupID(messageGroups.find(g => g.name === option).id)
    }

    const onDeleteAttribute = (attribute) => {
        let attributes = recipientAttributes.filter(attr => attr.id !== attribute.id)
        setRecipientAttributes(attributes.map((attr, index) => ({id: index, name: attr.name, value: attr.value})))
        attributes = attributes.map(attr => ({name: attr.name, value: attr.value}))
        attributes.pop()
        setAttributes(attributes)
    }

    return (
        <div id="add-message-group-recipient-form" className="add-user-container">
            <h1 className="add-user-header mb-5">Add New Message Group Recipient</h1>

            <div className="mt-5 mb-5">
                <div className="d-inline-flex align-items-center" style={{width: "15%", fontSize: "25px"}}>Message Group</div>
                <div className="d-inline-flex justify-content-center" style={{width: "85%"}}>
                    <DropList selectName="Select Group" options={messageGroups.map(item => item.name)} onSelect={onSelectGroup}/>
                </div>
            </div>

            <Input id="add-message-group-recipient-number" type="number" placeholder="Recipient Number" validrules="required">
                <i className="input-icon fas fa-mobile-retro"></i>
            </Input>

            <div style={{fontSize: "25px", margin: "60px 0 20px 0", color: "#063F30"}}>Do you want to add more attributes related to that recipient like his name or email?</div>

            <div style={{marginTop: "10px"}}>
                {recipientAttributes.map(input => (
                    <div key={input.id} className="d-flex justify-content-between my-2">
                        <div className="w-50 me-2">
                            <i style={{position: "absolute", marginTop: "13px", fontSize: "25px", marginLeft: "20px"}} className="fas fa-pencil"></i>
                            <input 
                                id={"add-message-group-recipient-attribute-name"} 
                                type="text" 
                                name="recipient-attributes" 
                                className="form-style"
                                placeholder="Recipient Attribute Name" 
                                autoComplete="off" 
                                onFocus={() => handleFocus(input.id)}
                                onChange={(event) => handleNameChange(input.id, event)}
                                value={input.name}
                            />
                        </div>
                        <div className="w-50 me-2">
                            <i style={{position: "absolute", marginTop: "13px", fontSize: "25px", marginLeft: "20px"}} className="fas fa-circle-info"></i>
                            <input 
                                id={"add-message-group-recipient-attribute-value"} 
                                type="text" 
                                name="recipient-attributes" 
                                className="form-style"
                                placeholder="Recipient Attribute Value" 
                                autoComplete="off" 
                                onChange={(event) => handleValueChange(input.id, event)}
                                value={input.value}
                            />
                        </div>
                        <div id={"delete-attribute-button-" + input.id} className="delete-attribute-button d-none" onClick={() => onDeleteAttribute(input)}>
                            <i className="fas fa-trash-can"></i>
                        </div>
                    </div>
                ))}
            </div>
            <div className="update-user">
                <button className="button" onClick={() => addNewMessageGroupRecipient()}>Add Message Group Recipient</button>
            </div>
        </div>
    )
}

export default AddMessageGroupRecipient