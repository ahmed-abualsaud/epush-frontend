import '../../assets/style/component/edit-role.css'

import useAuthApi from '../../api/useAuthApi'
import { showAlert } from '../../utils/validator'
import { useEffect, useRef, useState } from 'react'
import { isEmpty, snakeToBeautifulCase } from "../../utils/helper"
import { getElement } from '../../utils/dom'
import { navigate } from '../../setup/navigator'
import Page from '../../page/Page'

const EditRole = ({ role }) => {

    const excludedColumns = ["id", "created_at", "updated_at", "deleted_at"]

    const filteredColumns = Object.keys(role).filter(
        (column) => !excludedColumns.includes(column)
    )

    const [currentRole, setCurrentRole] = useState([])
    const [rolePermissions, setRolePermissions] = useState([])
    const [unassignedPermissionsID, setUnassignedPermissionsID] = useState([])
    const { updateRole, getRolePermissions, unassignRolePermissions } = useAuthApi()

    const setupLock = useRef(true)
    const setup = async () => {
        setCurrentRole(role)

        const rolprm = await getRolePermissions(role.id)
        if (rolprm) setRolePermissions(rolprm)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const updateSpecificRole = async () => {
        let query = ""
        filteredColumns.forEach((column) => {
            query += "#" + column + "-role-input, "
        })

        let roleInfoInput = document.querySelectorAll(query.substring(0, query.length - 2))

        let data = {}
        roleInfoInput.forEach(usrInp => ! isEmpty(usrInp.value) && (data[usrInp.id.split("-")[0]] = usrInp.value))
        isEmpty(data) && showAlert("You need to insert new role information")

        if (! isEmpty(data)) {
            let newRole = await updateRole(role["id"], data)
            if (! isEmpty(newRole)) {
                setCurrentRole(newRole)
                showAlert("Role information updated successfully");
            }
        }
    }

    const updateRolePermissions = async () => {
        if (isEmpty(unassignedPermissionsID)) {
            showAlert("No Changes Detected")
        }

        if (! isEmpty(unassignedPermissionsID) && (await unassignRolePermissions(role["id"], unassignedPermissionsID))) {
            showAlert("Role Permissions Updated Successfully")
            let removedCards =  rolePermissions.filter(permission => unassignedPermissionsID.includes(permission["id"])).map(permission => {
                    return "#" + permission["name"] + "-edit-role-permissions-card"
            })
            let elements = document.querySelectorAll(removedCards.join(", "))
            for (let i = 0; i < elements.length; i++) {
                if (elements[i].parentNode && elements[i].parentNode.contains(elements[i])) {
                    elements[i].parentNode?.removeChild(elements[i])
                }
            }
            setUnassignedPermissionsID([])  
        } 
    }

    const updateCardHead = (checkboxId, headId, iconId, permissionID) => {

        let permissionCardHead = getElement(headId)
        let permissionCardIcon = getElement(iconId)

        if (getElement(checkboxId).checked) {
            permissionCardHead.classList.remove("card-item-head-not-checked")
            permissionCardIcon.classList.add("uil-check-circle")
            permissionCardIcon.classList.remove("uil-exclamation-circle")
            permissionCardIcon.previousElementSibling.textContent = "Assigned"

            setUnassignedPermissionsID(unassignedPermissionsID.filter(value => value !== permissionID))

        } else {
            permissionCardHead.classList.add("card-item-head-not-checked")
            permissionCardIcon.classList.add("uil-exclamation-circle")
            permissionCardIcon.classList.remove("uil-check-circle")
            permissionCardIcon.previousElementSibling.textContent = "Not Assigned"

            setUnassignedPermissionsID([...unassignedPermissionsID, permissionID])
        }
    }


    return (
        <Page title="Role Information" className="edit-role-container">
            <div className="edit-role-info">
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
                                <td>{ typeof currentRole[column] === "boolean"? currentRole[column] ? "Yes" : "No" : currentRole[column] ?? "NULL"}</td>
                                <td className="info-input"> {
                                    <input id={column + "-role-input"} placeholder={ "Type the new " + snakeToBeautifulCase(column) + " here"} type="text"/>
                                }</td>
                            </tr>
                        ))}
                        <tr>
                            <td className="last-row" colSpan={3}></td>
                        </tr>
                    </tbody>
                </table>

                <div className="button-container">
                    <button className="button" onClick={() => updateSpecificRole()}>Update Role</button>
                </div>
            </div>

            <div className="role-permissons">
                <div className="edit-role-header d-flex justify-content-between">
                    <h1>Role Permissions</h1>
                    <button className="button" onClick={() => navigate("content", "permission-list", "Role", role["id"])}>Assign New Permission</button>
                </div>
                {isEmpty(rolePermissions)? <div className="no-data"> Role has no permissions! </div> :
                    <div className="cards-list">
                        {rolePermissions.map((rolePermission) => (
                            <div id={rolePermission["name"] + "-edit-role-permissions-card"} className="card-item">
                                <div id={rolePermission["name"] + "-edit-role-head"} className="card-item-head">
                                    <div>Permission Name</div>
                                    <div>Permission Description</div>
                                    <div>
                                        <span>Assigned</span>
                                        <i id={rolePermission["name"] + "-edit-role-icon"} className="uil uil-check-circle"></i>
                                    </div>
                                </div>
                                <div className="card-item-body">
                                    <div>{ rolePermission["name"] }</div>
                                    <div>{ rolePermission["description"] }</div>
                                    <div>
                                        <input 
                                            className="role-assign-checkbox" 
                                            type="checkbox" 
                                            id={rolePermission["name"] + "-edit-role-checkbox"} 
                                            onChange={() => updateCardHead(rolePermission["name"] + "-edit-role-checkbox", rolePermission["name"] + "-edit-role-head", rolePermission["name"] + "-edit-role-icon", rolePermission["permission_id"])} 
                                            defaultChecked={true}/> 
                                            Check this box to assign the permission
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                }
                <div className="button-container">
                    <button className="button" onClick={() => updateRolePermissions()}>Update Role Permissions</button>
                </div>
            </div>
        </Page>
    )
}

export default EditRole