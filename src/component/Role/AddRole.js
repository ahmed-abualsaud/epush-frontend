import { getElement } from "../../utils/dom"
import { isEmpty } from "../../utils/helper"
import useAuthApi from "../../api/useAuthApi"
import { useEffect, useRef, useState } from "react"
import { showAlert } from "../../utils/validator"
import Input from "../../layout/Shared/Input"

const AddRole = () =>{

    const { addRole, listPermissions, assignRolePermissions } = useAuthApi()
    const [permissions, setPermissions] = useState([])
    const [assignedPermissionsID, setAssignedPermissionsID] = useState([])

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        const prm = await listPermissions(perPage)
        if (prm.data) setPermissions(prm.data)
    }

    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup(1000000000) }
    }, [])

    const addNewRole = async () => {
        let newRole = {}
        newRole.name = getElement("add-role-name").value
        if (isEmpty(newRole)) {
            showAlert("Role Information is required") 
            return
        }

        newRole = await addRole(newRole)

        if (! isEmpty(newRole)) {
            showAlert("Role created successfully")
            if (! isEmpty(assignedPermissionsID) && (await assignRolePermissions(newRole.id, assignedPermissionsID))) {
                showAlert("Permissions assigned successfully") 
                let childElements = getElement("assign-role-permissions-list").children
                for (let i = 0; i < childElements.length; i++) {
                    childElements[i].querySelector(".role-card-head").classList.add("role-card-head-not-checked")
                    childElements[i].querySelector("input").checked = false
                }
                setAssignedPermissionsID([])
            }

        }
    }

    const updateCardHead = (checkboxId, headId, iconId, permissionID) => {

        let permissionCardHead = getElement(headId)
        let permissionCardIcon = getElement(iconId)

        if (getElement(checkboxId).checked) {
            permissionCardHead.classList.remove("role-card-head-not-checked")
            permissionCardIcon.classList.add("uil-check-circle")
            permissionCardIcon.classList.remove("uil-exclamation-circle")
            permissionCardIcon.previousElementSibling.textContent = "Assigned"

            setAssignedPermissionsID([...assignedPermissionsID, permissionID])

        } else {
            permissionCardHead.classList.add("role-card-head-not-checked")
            permissionCardIcon.classList.add("uil-exclamation-circle")
            permissionCardIcon.classList.remove("uil-check-circle")
            permissionCardIcon.previousElementSibling.textContent = "Not Assigned"

            setAssignedPermissionsID(assignedPermissionsID.filter(value => value !== permissionID))
        }
    }




    return (
        <div>
            <div id="add-role-form">
                <div className="assign-role-header mb-5">
                    <h1>Role Information</h1>
                </div>
                <li className="my-3"><h4 className="d-inline-block">Eneter Role Name</h4></li>
                <Input className="mb-5" id="add-role-name" type="text" placeholder="Role Name" validrules="required">
                    <i className="input-icon uil uil-user-md"></i>
                </Input>
            </div>
            <div className="user-permissons">
                <div className="assign-role-header">
                    <h1>Available Permissions</h1>
                </div>
                {<div id="assign-role-permissions-list" className="roles-list">
                    {permissions.map((permission) => (
                        <div className="role-card">
                            <div id={permission["name"] + "-permission-assign-head"} className="role-card-head role-card-head-not-checked">
                                <div>Permission Name</div>
                                <div>Permission Description</div>
                                <div>
                                    <span>Not Assigned</span>
                                    <i id={permission["name"] + "-permission-assign-icon"} className="uil uil-exclamation-circle"></i>
                                </div>
                            </div>
                            <div className="role-card-body">
                                <div>{ permission["name"] }</div>
                                <div style={{width:"60%"}}>{ permission["description"] }</div>
                                <div>
                                    <input 
                                        className="role-assign-checkbox" 
                                        type="checkbox" 
                                        id={permission["name"] + "-permission-assign-checkbox"} 
                                        onChange={() => updateCardHead(permission["name"] + "-permission-assign-checkbox", permission["name"] + "-permission-assign-head", permission["name"] + "-permission-assign-icon", permission["id"])} 
                                        defaultChecked={false}/> 
                                        Check this box to assign the permission
                                </div>
                            </div>
                        </div>
                    ))}
                </div>}
                <div className="update-user">
                    <button style={{width: "505px"}} className="button" onClick={() => addNewRole()}>Add New Role</button>
                </div>
            </div>
        </div>
    )
}

export default AddRole