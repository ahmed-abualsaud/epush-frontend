import { getElement } from "../../utils/dom"
import useCoreApi from "../../api/useCoreApi"
import { showAlert } from "../../utils/validator"
import { useEffect, useRef, useState } from "react"
import { isEmpty, snakeToBeautifulCase } from "../../utils/helper"
import { render } from "../../setup/navigator"
import Avatar from "../../layout/Shared/Avatar"
import Page from "../../page/Page"

const EditPartner = ({ partner }) => {

    const excludedColumns = [
        "id", 
        "full_name", 
        "avatar", 
        "enabled", 
        "created_at", 
        "updated_at", 
        "deleted_at", 
        "email_verified_at"
    ]

    const filteredColumns = Object.keys(partner).filter(
      (column) => !excludedColumns.includes(column)
    )

    const { updatePartner } = useCoreApi()
    const [currentPartner, setCurrentPartner] = useState([])
    const [avatar, setAvatar] = useState({})

    const setupLock = useRef(true)
    const setup = async () => {
        setCurrentPartner(partner)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const onSelectAvatar = (avatar) => {
        setAvatar(avatar)
    }

    const enableDisablePartner = async (checkboxId) => {
        let data = new FormData()
        data.append("enabled", getElement(checkboxId).checked)
        let newPartner = await updatePartner(partner["user_id"], data)

        if (! isEmpty(newPartner)) {
            setCurrentPartner(newPartner)
            getElement(checkboxId).checked ? showAlert("Partner has been enabled"): showAlert("Partner has been disabled")
        }
    }

    const updatePartnerAvatar = async () => {
        if (! isEmpty(avatar)) {
            let data = new FormData()
            data.append("avatar", avatar)
            data = await updatePartner(partner["user_id"], data)
            if (! isEmpty(data)) {
                setCurrentPartner(data)
                showAlert("Partner avatar updated successfully")
            }
        } else {
            showAlert("Please choose your avatar first")
        }
    }

    const updatePartnerInfo = async () => {
        let query = ""
        filteredColumns.forEach((column) => {
            query += "#" + column + "-input, "
        })

        let userInfoInput = document.querySelectorAll(query.substring(0, query.length - 2))
        let data = new FormData()
        userInfoInput.forEach(usrInp => ! isEmpty(usrInp.value) && (data.append(usrInp.id.split("-")[0], usrInp.value)))
        isEmpty(data) && showAlert("You need to insert new partner information")
        if (! isEmpty(data)) {
            let newPartner = await updatePartner(partner["user_id"], data)
            if (! isEmpty(newPartner)) {
                setCurrentPartner(newPartner)
                showAlert("Partner information updated successfully")
            }
        }
    }


    return (
        <Page title="Partner Information">
            <div className="user-info">
                <div className="user-avatar-password">
                    <div>
                        <Avatar imageUrl={partner.avatar} onSelectAvatar={onSelectAvatar}/>
                        <div className="w-100 d-flex justify-content-center">
                                <button className="button" onClick={() => updatePartnerAvatar()}>Update Avatar</button>
                        </div>
                    </div>

                    <div className="user-generate-password">
                        <div className="password-hint">Click the button to create a new password for this partner and update their old password with the new one.</div>
                        <a href="#popup">
                            <button 
                                onClick={() => render("modal-content", "generate-password-modal", partner["user_id"])} 
                                className="button password-button"
                            >
                                Generate New Password
                            </button>
                        </a>
                        <hr style={{width: "95%", margin: "auto"}} />
                        <div className="enable-disable-user">
                            <div className="enable-disable-hint">Click on the switch button to enable or disable the partner!</div>
                            <div className="enable-disable-switch d-flex flex-column align-items-center">
                                <h6><span>Disabled</span><span>Enabled</span></h6>
                                <input 
                                    id="en-dis-partner" 
                                    className="checkbox d-none" 
                                    type="checkbox" 
                                    onChange={() => enableDisablePartner("en-dis-partner")}
                                    defaultChecked={currentPartner["enabled"] ?? partner["enabled"]}
                                />
                                <label for="en-dis-partner"></label>
                            </div>
                        </div>
                    </div>
                </div>

                <table className="fl-table">
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
                            column !== "websites" &&
                            <tr>
                                <td>{ column }</td>
                                <td>{ typeof currentPartner[column] === "boolean"? currentPartner[column] ? "Yes" : "No" : currentPartner[column] ?? "NULL"}</td>
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
                    <button className="button" onClick={() => updatePartnerInfo()}>Update Partner Info</button>
                </div>
            </div>
        </Page>
    )
}

export default EditPartner