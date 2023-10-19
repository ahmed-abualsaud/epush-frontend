import '../../assets/style/component/role-list.css'

import { isEmpty } from "../../utils/helper"
import useAuthApi from "../../api/useAuthApi"
import { useEffect, useRef, useState } from "react"
import { getElement, updateElement } from "../../utils/dom"
import { showAlert } from '../../utils/validator'

const RoleList = ({ userID }) => {

    const { listRoles, assignUserRoles, getRolePermissions } = useAuthApi()
    const [roles, setRoles] = useState([])
    const [assignedRolesID, setAssignedRolesID] = useState([])
    const [rolesPermissions, setRolesPermissions] = useState([])

    const setupLock = useRef(true)
    const setup = async (perPage) => {
        const rol = await listRoles(perPage)
        if (rol.data) setRoles(rol.data)
    }

    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup(1000000000) }
    }, [])

    const assignRoles = async () => {
        if (isEmpty(assignedRolesID)) {
            showAlert("Select roles first")
        }

        if (! isEmpty(assignedRolesID) && (await assignUserRoles(userID, assignedRolesID))) {
            showAlert("Roles assigned successfully")
            let childElements = getElement("assign-user-cards-list").children
            for (let i = 0; i < childElements.length; i++) {
                childElements[i].querySelector(".card-item-head").classList.add("card-item-head-not-checked")
                childElements[i].querySelector("input").checked = false
            }
            setAssignedRolesID([]);
        } 
    }

    const getRolePermissionsState = (roleId) => {
        return rolesPermissions.filter(
            rolePermissions => rolePermissions.roleId === roleId
        )[0]
    }

    const showRolePermissions = async (roleId, roleListId) => {

        let prm = []
        const rolePerms = getRolePermissionsState(roleId)
        let rolePermsIsEmpty = isEmpty(rolePerms)

        if (rolePermsIsEmpty) {
            prm = await getRolePermissions(roleId)
            setRolesPermissions([...rolesPermissions, { roleId: roleId, permissions: prm }])
        }

        const rolePermissionsList = getElement(roleListId)
        rolePermissionsList.innerHTML = ""
        rolePermissionsList.classList.toggle("expand-card-item-list")
        if (rolePermissionsList.classList.contains("expand-card-item-list")) {
            updateElement([
                <span>Hide Permissions</span>,
                <i class="uil uil-angle-up"></i>
            ], roleId + "-show-permissions-button")
            rolePermissionsList.style.border = "1px solid #fff"
        } else {
            updateElement([
                    <span>Show Permissions</span>,
                    <i class="uil uil-angle-down"></i>
            ], roleId + "-show-permissions-button")
            rolePermissionsList.style.border = ""
        }

        const rolePermList = rolePermsIsEmpty ? prm : rolePerms.permissions

        updateElement(
            isEmpty(rolePermList)? <div class="no-data" style="margin-top: 0;"> Role has no permissions! </div> :
            <table class="fl-table">
                <thead>
                    <tr>
                        <th>Permission ID</th>
                        <th>Permission Name</th>
                        <th>Permission Description</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(rolePermList).map((permission) => (
                        <tr>
                            <td>{permission.id}</td>
                            <td>{permission.name}</td>
                            <td>{permission.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        , roleListId)
    }

    const updateCardHead = (checkboxId, headId, iconId, roleID) => {
        let roleCardHead = getElement(headId)
        let roleCardIcon = getElement(iconId)

        if (getElement(checkboxId).checked) {
            roleCardHead.classList.remove("card-item-head-not-checked")
            roleCardIcon.classList.add("uil-check-circle")
            roleCardIcon.classList.remove("uil-exclamation-circle")
            roleCardIcon.previousElementSibling.textContent = "Assigned"

            setAssignedRolesID([...assignedRolesID, roleID])

        } else {
            roleCardHead.classList.add("card-item-head-not-checked")
            roleCardIcon.classList.add("uil-exclamation-circle")
            roleCardIcon.classList.remove("uil-check-circle")
            roleCardIcon.previousElementSibling.textContent = "Not Assigned"

            setAssignedRolesID(assignedRolesID.filter(value => value !== roleID))
        }
    }





    return (
        <div className="component-container">
            <div className="assign-role-header">
                <h1>Available Roles</h1>
            </div>
            {<div id="assign-user-cards-list" className="cards-list">
                {roles.map((role) => (
                    <div className="card-item">
                        <div id={role["name"] + "-role-assign-head"} className="card-item-head card-item-head-not-checked">
                            <div>Role Name</div>
                            <div>
                                <span>Not Assigned</span>
                                <i id={role["name"] + "-role-assign-icon"} className="uil uil-exclamation-circle"></i>
                            </div>
                        </div>
                        <div className="card-item-body">
                            <div>{ role["name"] }</div>
                            <div>
                                <input 
                                    className="role-assign-checkbox" 
                                    type="checkbox" 
                                    id={role["name"] + "-role-assign-checkbox"} 
                                    onChange={() => updateCardHead(role["name"] + "-role-assign-checkbox", role["name"] + "-role-assign-head", role["name"] + "-role-assign-icon", role["id"])} 
                                    defaultChecked={false}/> 
                                    Check this box to assign the role
                            </div>
                        </div>
                        <div id={role["id"] + "-show-permissions-button"} className="expand-card-item" onClick={() => showRolePermissions(role["id"], role["name"] + "-role-assign-permissions-list")}>
                            <span>Show Permissions</span>
                            <i className="uil uil-angle-down"></i>
                        </div>
                        <ul id={role["name"] + "-role-assign-permissions-list"} className="card-item-subitems"></ul>
                    </div>                            
                ))}
            </div>}
            {! isEmpty(roles) && 
                <div className="button-container">
                    <button className="button" onClick={() => assignRoles()}>Assign Selected Roles</button>
                </div>
            }
        </div>
    )
}

export default RoleList