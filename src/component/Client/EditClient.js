import { getElement } from "../../utils/dom"
import useCoreApi from "../../api/useCoreApi"
import { render } from "../../setup/navigator"
import { showAlert } from "../../utils/validator"
import { useEffect, useRef, useState } from "react"
import { isEmpty, snakeToBeautifulCase } from "../../utils/helper"

const EditClient = ({ client }) => {

    const excludedColumns = [
        "id", 
        "full_name",
        "sales_id",
        "pricelist_id",
        "balance",
        "avatar", 
        "enabled", 
        "created_at", 
        "updated_at", 
        "deleted_at", 
        "email_verified_at",
        "business_field_id",
        "user_id",
        "governmentId",
        "areaId",
        "adminId",
        "FDelete"
    ]

    const filteredColumns = Object.keys(client).filter(
      (column) => !excludedColumns.includes(column)
    )

    const { updateClient } = useCoreApi()
    const [currentClient, setCurrentClient] = useState([])
    const [imagePreview, setImagePreview] = useState(client["avatar"] ?? "https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg")

    const setupLock = useRef(true)
    const setup = async () => {
        setCurrentClient(client)
        document.querySelector('.uil-camera-plus').addEventListener("click", () => getElement("edit-client-avatar-input").click())
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onload = function (e) {
            setImagePreview(e.target.result)
        }
        reader.readAsDataURL(file)
    }

    const enableDisableClient = async (checkboxId) => {
        let data = new FormData()
        data.append("enabled", getElement(checkboxId).checked)
        let newClient = await updateClient(client["user_id"], data)

        if (! isEmpty(newClient)) {
            setCurrentClient(newClient)
            getElement(checkboxId).checked ? showAlert("Client has been enabled"): showAlert("Client has been disabled")
        }
    }

    const updateClientAvatar = async () => {
        let avatar = getElement("edit-client-avatar-input").files[0]
        if (! isEmpty(avatar)) {
            let data = new FormData()
            data.append("avatar", avatar)
            data = await updateClient(client["user_id"], data)
            if (! isEmpty(data)) {
                setCurrentClient(data)
                showAlert("Client avatar updated successfully")
            }
        } else {
            showAlert("Please choose your avatar first")
        }
    }

    const updateClientInfo = async () => {
        let query = ""
        filteredColumns.forEach((column) => {
            query += "#" + column + "-input, "
        })

        let userInfoInput = document.querySelectorAll(query.substring(0, query.length - 2))
        let data = new FormData()
        userInfoInput.forEach(usrInp => {
            if(! isEmpty(usrInp.value)) {data.append(usrInp.id.split("-")[0], usrInp.value)}
        })
        isEmpty(data) && showAlert("You need to insert new client information")
        if (! isEmpty(data)) {
            let newClient = await updateClient(client["user_id"], data)
            console.log(newClient)
            if (! isEmpty(newClient)) {
                setCurrentClient(newClient)
                showAlert("Client information updated successfully")
            }
        }
    }

    const updateClientWebsites = async () => {
        let data = new FormData()
        let websites = []

        for (let i = 0; i < currentClient.websites.length; i++) {
            websites.push("#website-input-" + i)
        }
        if (isEmpty(websites)) {
            showAlert("You have no websites to update")
            return
        }
        
        let websitesInputs = document.querySelectorAll(websites.join(", "))
        websites = []

        websitesInputs.forEach((websiteInput) => {
            websiteInput.value && websites.push({id: websiteInput.name, url: websiteInput.value})
        })

        isEmpty(websites) && showAlert("You need to insert new client websites")
        if (! isEmpty(websites)) {
            data.append("websites", JSON.stringify(websites))
            let newClient = await updateClient(client["user_id"], data)

            if (! isEmpty(newClient)) {
                setCurrentClient(newClient)
                showAlert("Client websites updated successfully")
            }
        }
    }

    const deleteClientWebsite = async (websiteID) => {
        let data = new FormData()
        let syncWebsites = currentClient.websites.filter(website => website.id !== websiteID)
        data.append("websites", JSON.stringify(syncWebsites))
        data.append("sync_websites", true)
        let newClient = await updateClient(client["user_id"], data)
        if (! isEmpty(newClient)) {
            setCurrentClient(newClient)
            showAlert("Client website deleted successfully")
        }
    }

    const addClientWebsite = async (url) => {
        let data = new FormData()
        let syncWebsites = currentClient.websites
        syncWebsites.push({url: url})
        data.append("websites", JSON.stringify(syncWebsites))
        data.append("sync_websites", true)
        let newClient = await updateClient(client["user_id"], data)
        if (! isEmpty(newClient)) {
            setCurrentClient(newClient)
            showAlert("Client website added successfully")
        }
    }


    return (
        <div className="component-container">
            <h1 className="content-header">Client Information</h1>
            <div className="user-info">
                <div className="user-avatar-password">
                    <div className="user-image">
                        <div className="avatar-hint">Click on your avatar if you want to change it!</div>
                        <div className="image-wrapper">
                            <img src={ imagePreview } alt="Avatar" />
                            <input id="edit-client-avatar-input" type="file" accept="image/*" onChange={handleImageChange}/>
                            <i className="uil uil-camera-plus"></i>
                        </div>
                        <button className="button" onClick={() => updateClientAvatar()}>Update Avatar</button>
                    </div>
                    <div className="user-generate-password">
                        <div className="password-hint">Click the button to create a new password for this client and update their old password with the new one.</div>
                        <a href="#popup">
                            <button 
                                onClick={() => render("modal-content", "generate-password-modal", client["user_id"])} 
                                className="button password-button"
                            >
                                Generate New Password
                            </button>
                        </a>
                        <hr style={{width: "95%", margin: "auto"}} />
                        <div className="enable-disable-user">
                            <div className="enable-disable-hint">Click on the switch button to enable or disable the client!</div>
                            <div className="enable-disable-switch d-flex flex-column align-items-center">
                                <h6><span>Disabled</span><span>Enabled</span></h6>
                                <input 
                                    id="en-dis-client" 
                                    className="checkbox d-none" 
                                    type="checkbox" 
                                    onChange={() => enableDisableClient("en-dis-client")}
                                    defaultChecked={currentClient["enabled"] ?? client["enabled"]}
                                />
                                <label for="en-dis-client"></label>
                            </div>
                        </div>
                    </div>
                </div>

                <table style={{marginTop: "100px"}} className="fl-table">
                    <thead>
                        <tr>
                            <th colSpan={3}>Websites</th>
                        </tr>
                        <tr>
                            <th className="last-row" colSpan={3}></th>
                        </tr>
                        <tr>
                            <th>Current Value</th>
                            <th>New Value</th>
                            <th style={{padding: "0", width: "110px"}} colSpan={3} key="add" onClick={() => render("modal-content", "add-website-modal", addClientWebsite)}>
                                <a href="#popup" className="button add-button"><i className="uil uil-plus"></i>Add</a>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            ! isEmpty(currentClient) && (! isEmpty(currentClient.websites) ?
                            currentClient.websites.map((website, index) => (
                                <tr>
                                    <td>{ website.url }</td>
                                    <td className="info-input">
                                        <input id={"website-input-" + index} placeholder={ "Type the new Website here" } type="text" name={website.id}/>
                                    </td>
                                    <td 
                                        style={{padding: "0"}} 
                                        onClick={() => deleteClientWebsite(website.id)} 
                                        key="delete" 
                                        className="operation"
                                    >
                                        <a className="modal-button btn-del"><i className="uil uil-trash-alt"></i></a>
                                    </td>
                                </tr>
                            )) : <tr><td colSpan={3}><div className="no-data"> Client has no Websites! </div></td></tr>)
                        }
                        <tr>
                            <td className="last-row" colSpan={3}></td>
                        </tr>
                    </tbody>
                </table>
                <div className="button-container">
                    <button className="button" onClick={() => updateClientWebsites()}>Update Client Websites</button>
                </div>

                <table style={{marginTop: "100px"}} className="fl-table">
                    <thead>
                        <tr>
                            <th colSpan={3}>Information</th>
                        </tr>
                        <tr>
                            <th className="last-row" colSpan={3}></th>
                        </tr>
                        <tr>
                            <th>Attribute Name</th>
                            <th>Current Value</th>
                            <th>New Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredColumns?.map((column) => (
                            ! ["websites", "sales", "business_field", "businessfield"].includes(column)  &&
                            <tr>
                                <td>{ column }</td>
                                <td>{ typeof currentClient[column] === "boolean"? currentClient[column] ? "Yes" : "No" : currentClient[column] ?? "NULL"}</td>
                                <td className="info-input"> {
                                    column === "phone"? <input id="phone-input" placeholder={ "Type the new Phone here" } type="number"/> : 
                                    column === "email" ? <input id="email-input" placeholder={ "Type the new Email here" } type="email"/> : 
                                    <input id={column + "-input"} placeholder={ "Type the new " + snakeToBeautifulCase(column) + " here"} type="text"/>
                                }</td>
                            </tr>
                        ))}
                        <tr>
                            <td className="last-row" colSpan={3}></td>
                        </tr>
                    </tbody>
                </table>
                <div className="button-container">
                    <button className="button" onClick={() => updateClientInfo()}>Update Client Info</button>
                </div>
            </div>
        </div>
    )
}

export default EditClient