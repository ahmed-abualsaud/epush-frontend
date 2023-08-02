import '../assets/style/component/edit-user.css'
import useAuthApi from '../api/useAuthApi'
import { getElement, updateElement } from '../utils/dom'
import { useEffect, useRef, useState } from 'react'
import { isEmpty, snakeToBeautifulCase } from '../utils/helper'
import { showAlert } from '../utils/validator'
import { useDispatch, useSelector } from 'react-redux'
import { updateAuthUser } from '../container/redux/slice/authSlice'
import { navigate } from '../setup/navigator'

const EditUser = ({ user }) => {

    const excludedColumns = ["id", "full_name", "avatar", "enabled", "created_at", "updated_at", "deleted_at", "email_verified_at"]

    const filteredColumns = Object.keys(user).filter(
      (column) => !excludedColumns.includes(column)
    )

    const authUser = useSelector((state) => state.auth.user)?.user

    const dispatch = useDispatch()
    const [userRoles, setUserRoles] = useState([])
    const [currentUser, setCurrentUser] = useState([])
    const [userPermissions, setUserPermissions] = useState([])
    const [rolesPermissions, setRolesPermissions] = useState([])
    const [unassignedRolesID, setUnassignedRolesID] = useState([])
    const [unassignedPermissionsID, setUnassignedPermissionsID] = useState([])
    const [imagePreview, setImagePreview] = useState(user["avatar"] ?? "https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg");
    const { updateUser, getUserRoles, unassignUserRoles, unassignUserPermissions, getUserPermissions, getRolePermissions } =  useAuthApi()

    const setupLock = useRef(true)
    const setup = async () => {
        setCurrentUser(user)
        document.querySelector('.uil-camera-plus').addEventListener("click", () => getElement("edit-avatar-input").click())

        const usrol = await getUserRoles(user["id"])
        if (usrol) setUserRoles(usrol)

        const usrprm = await getUserPermissions(user["id"])
        if (usrprm) setUserPermissions(usrprm)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

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
        rolePermissionsList.classList.toggle("show-role-permissions-list")
        if (rolePermissionsList.classList.contains("show-role-permissions-list")) {
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
            isEmpty(rolePermList)? <div class="user-no-perm" style="margin-top: 0;"> Role has no permissions! </div> :
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

    const updateCardHead = (checkboxId, headId, iconId, updateID, roleOrPerm = "role") => {

        let roleCardHead = getElement(headId)
        let roleCardIcon = getElement(iconId)

        if (getElement(checkboxId).checked) {
            roleCardHead.classList.remove("role-card-head-not-checked")
            roleCardIcon.classList.add("uil-check-circle")
            roleCardIcon.classList.remove("uil-exclamation-circle")
            roleCardIcon.previousElementSibling.textContent = "Assigned"

            if (roleOrPerm === "role") {
                setUnassignedRolesID(unassignedRolesID.filter(value => value !== updateID))
            } 
            if (roleOrPerm === "permission") {
                setUnassignedPermissionsID(unassignedPermissionsID.filter(value => value !== updateID))
            }
        } else {
            roleCardHead.classList.add("role-card-head-not-checked")
            roleCardIcon.classList.add("uil-exclamation-circle")
            roleCardIcon.classList.remove("uil-check-circle")
            roleCardIcon.previousElementSibling.textContent = "Not Assigned"

            if (roleOrPerm === "role") {
                setUnassignedRolesID([...unassignedRolesID, updateID])
            } 
            if (roleOrPerm === "permission") {
                setUnassignedPermissionsID([...unassignedPermissionsID, updateID])
            }
        }
    }

    const updateUserInfo = async () => {
        let query = ""
        filteredColumns.forEach((column) => {
            query += "#" + column + "-input, "
        })

        let userInfoInput = document.querySelectorAll(query.substring(0, query.length - 2))

        let data = new FormData()
        userInfoInput.forEach(usrInp => ! isEmpty(usrInp.value) && (data.append(usrInp.id.split("-")[0], usrInp.value)))
        isEmpty(data) && showAlert("You need to insert new user information")
        if (! isEmpty(data)) {
            let newUser = await updateUser(user["id"], data)
            if (! isEmpty(newUser)) {
                setCurrentUser(newUser)
                showAlert("User information updated successfully");
                (user["id"] === authUser.id) && dispatch(updateAuthUser(newUser)) && localStorage.setItem('user', JSON.stringify(newUser))
            }
        }
    }

    const enableDisableUser = async (checkboxId) => {
        let data = new FormData()
        data.append("enabled", getElement(checkboxId).checked)
        let newUser = await updateUser(user["id"], data)
        if (! isEmpty(newUser)) {
            setCurrentUser(newUser)
            getElement(checkboxId).checked ? showAlert("User has been enabled"): showAlert("User has been disabled");
            (user["id"] === authUser.id) && dispatch(updateAuthUser(newUser)) && localStorage.setItem('user', JSON.stringify(newUser))
        }
    }

    const updateUserRoles = async () => {
        if (isEmpty(unassignedRolesID)) {
            showAlert("No Changes Detected")
        }

        if (! isEmpty(unassignedRolesID) && (await unassignUserRoles(user["id"], unassignedRolesID))) 
        {
            showAlert("User Roles Updated Successfully")
            let removedCards =  userRoles.filter(role => unassignedRolesID.includes(role["id"])).map(role => {
                return "#" + role["name"] + "-edit-user-role-card"
            })
            let elements = document.querySelectorAll(removedCards.join(", "))
            for (let i = 0; i < elements.length; i++) {
                if (elements[i].parentNode && elements[i].parentNode.contains(elements[i])) {
                    elements[i].parentNode.removeChild(elements[i])
                }
            }
            setUnassignedRolesID([])
        }
    }

    const updateUserPermissions = async () => {
        if (isEmpty(unassignedPermissionsID)) {
            showAlert("No Changes Detected")
        }

        if (! isEmpty(unassignedPermissionsID) && (await unassignUserPermissions(user["id"], unassignedPermissionsID))) {
            await unassignUserPermissions(user["id"], unassignedPermissionsID)
            showAlert("User Permissions Updated Successfully")
            let removedCards =  userPermissions.filter(permission => unassignedPermissionsID.includes(permission["permission_id"])).map(permission => {
                return "#" + permission["name"] + "-edit-user-permissions-card"
            })
            let elements = document.querySelectorAll(removedCards.join(", "))
            for (let i = 0; i < elements.length; i++) {
                if (elements[i].parentNode && elements[i].parentNode.contains(elements[i])) {
                    elements[i].parentNode.removeChild(elements[i])
                }
            }
            setUnassignedPermissionsID([])
        }
    }

    const updateUserAvatar = async () => {
        let avatar = getElement("edit-avatar-input").files[0]
        if (! isEmpty(avatar)) {
            let data = new FormData()
            data.append("avatar", avatar)
            data = await updateUser(user["id"], data)
            if (! isEmpty(data)) {
                setCurrentUser(data)
                showAlert("User avatar updated successfully");
                (user["id"] === authUser.id) && dispatch(updateAuthUser(data)) && localStorage.setItem('user', JSON.stringify(data))
            }
        } else {
            showAlert("Please choose your avatar first")
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            setImagePreview(e.target.result);
        };
        reader.readAsDataURL(file);
    }


//================================================================================================================================================


    return (
        <div className="edit-user-container">
            <div className="user-info">
                <h1 className="edit-user-header">User Information</h1>
                <div className="user-avatar-password">
                    <div className="user-image">
                        <div className="avatar-hint">Click on your avatar if you want to change it!</div>
                        <div className="image-wrapper">
                            <img src={ imagePreview } alt="Avatar" />
                            <input id="edit-avatar-input" type="file" accept="image/*" onChange={handleImageChange}/>
                            <i className="uil uil-camera-plus"></i>
                        </div>
                        <button className="button" onClick={() => updateUserAvatar()}>Update Avatar</button>
                    </div>
                    <div className="user-generate-password">
                        <div className="password-hint">Click the button to create a new password for this user and update their old password with the new one.</div>
                        <a href="#popup">
                            <button 
                                onClick={() => navigate("modal-content", "generate-password-modal", user["id"])} 
                                className="button password-button"
                            >
                                Generate New Password
                            </button>
                        </a>
                        <hr style={{width: "95%", margin: "auto"}} />
                        <div className="enable-disable-user">
                            <div className="enable-disable-hint">Click on the switch button to enable or disable the user!</div>
                            <div className="enable-disable-switch d-flex flex-column align-items-center">
                                <h6><span>Disabled</span><span>Enabled</span></h6>
                                <input 
                                    id="en-dis-user" 
                                    className="checkbox d-none" 
                                    type="checkbox" 
                                    onChange={() => enableDisableUser("en-dis-user")}
                                    defaultChecked={currentUser["enabled"] ?? user["enabled"]}
                                />
                                <label for="en-dis-user"></label>
                            </div>
                        </div>
                    </div>
                </div>
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
                                <td>{ typeof currentUser[column] === "boolean"? currentUser[column] ? "Yes" : "No" : currentUser[column] ?? "NULL"}</td>
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
                <div className="update-user">
                    <button className="button" onClick={() => updateUserInfo()}>Update User Info</button>
                </div>
            </div>



            <div className="user-roles">
                <div className="edit-user-header d-flex justify-content-between">
                    <h1>User Roles</h1>
                    <button className="button" onClick={() => navigate("content", "role-list", user["id"])}>Assign New Role</button>
                </div>
                {isEmpty(userRoles)? <div className="user-no-perm"> User has no roles! </div> :
                    <div className="roles-list">
                        {userRoles.map((userRole) => (
                            <div id={userRole["name"] + "-edit-user-role-card"} className="role-card">
                                <div id={userRole["name"] + "-head"} className="role-card-head">
                                    <div>Role Name</div>
                                    <div>
                                        <span>Assigned</span>
                                        <i id={userRole["name"] + "-icon"} className="uil uil-check-circle"></i>
                                    </div>
                                </div>
                                <div className="role-card-body">
                                    <div>{ userRole["name"] }</div>
                                    <div>
                                        <input 
                                            className="role-assign-checkbox" 
                                            type="checkbox" 
                                            id={userRole["name"] + "-checkbox"} 
                                            onChange={() => updateCardHead(userRole["name"] + "-checkbox", userRole["name"] + "-head", userRole["name"] + "-icon", userRole["id"], "role")} 
                                            defaultChecked={true}/> 
                                            Check this box to assign the role
                                    </div>
                                </div>
                                <div id={userRole["id"] + "-show-permissions-button"} className="show-role-permissions" onClick={() => showRolePermissions(userRole["id"], userRole["name"] + "-permissions-list")}>
                                    <span>Show Permissions</span>
                                    <i className="uil uil-angle-down"></i>
                                </div>
                                <ul id={userRole["name"] + "-permissions-list"} className="role-permissions-list"></ul>
                            </div>                            
                        ))}
                    </div>
                }
                {! isEmpty(userRoles) && 
                    <div className="update-user">
                        <button className="button" onClick={() => updateUserRoles()}>Update User Roles</button>
                    </div>
                }
            </div>



            <div className="user-permissons">
                <div className="edit-user-header d-flex justify-content-between">
                    <h1>User Permissions</h1>
                    <button className="button" onClick={() => navigate("content", "permission-list", "User", user["id"])}>Assign New Permission</button>
                </div>
                {isEmpty(userPermissions)? <div className="user-no-perm"> User has no permissions! </div> :
                    <div className="roles-list">
                        {userPermissions.map((userPermission) => (
                            <div id={userPermission["name"] + "-edit-user-permissions-card"} className="role-card">
                                <div id={userPermission["name"] + "-head"} className="role-card-head">
                                    <div>Permission Name</div>
                                    <div>Permission Description</div>
                                    <div>
                                        <span>Assigned</span>
                                        <i id={userPermission["name"] + "-icon"} className="uil uil-check-circle"></i>
                                    </div>
                                </div>
                                <div className="role-card-body">
                                    <div>{ userPermission["name"] }</div>
                                    <div>{ userPermission["description"] }</div>
                                    <div>
                                        <input 
                                            className="role-assign-checkbox" 
                                            type="checkbox" 
                                            id={userPermission["name"] + "-checkbox"} 
                                            onChange={() => updateCardHead(userPermission["name"] + "-checkbox", userPermission["name"] + "-head", userPermission["name"] + "-icon", userPermission["permission_id"], "permission")} 
                                            defaultChecked={true}/> 
                                            Check this box to assign the permission
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                }
                <div className="update-user">
                    <button className="button" onClick={() => updateUserPermissions()}>Update User Permissions</button>
                </div>
            </div>
        </div>
    )
}

export default EditUser