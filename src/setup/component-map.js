import Handler from '../component/Handler'
import AddRole from "../component/AddRole"
import EditUser from '../component/EditUser'
import EditRole from '../component/EditRole'
import RoleList from "../component/RoleList"
import ShowModal from "../component/ShowModal"
import RolesTable from "../component/RolesTable"
import UsersTable from "../component/UsersTable"
import HandleGroup from '../component/HandleGroup'
import DeleteModal from "../component/DeleteModal"
import AddUserModal from "../component/AddUserModal"
import ShowUserInfo from "../component/ShowUserInfo"
import AddClientUser from "../component/AddClientUser"
import EditPermission from '../component/EditPermission'
import PermissionList from "../component/PermissionList"
import AddGeneralUser from "../component/AddGeneralUser"
import ServiceContexts from '../component/ServiceContexts'
import PermissionsTable from "../component/PermissionsTable"
import GeneratePasswordModal from "../component/GeneratePasswordModal"



const componentMap = {

    "add-role":                 () => <AddRole/>,
    "users-table":              () => <UsersTable/>,
    "roles-table":              () => <RolesTable/>,
    "add-user-modal":           () => <AddUserModal/>,
    "add-client-user":          () => <AddClientUser/>,
    "add-general-user":         () => <AddGeneralUser/>,
    "permissions-table":        () => <PermissionsTable/>,
    "edit-user":                (user) => <EditUser user={user}/>,
    "edit-role":                (role) => <EditRole role={role}/>,
    "show-user-info":           (row) => <ShowUserInfo user={row}/>,
    "role-list":                (userID) => <RoleList userID={userID}/>,
    "service-contexts":         (service) => <ServiceContexts service={service}/>,
    "generate-password-modal":  (userID) => <GeneratePasswordModal userID={userID}/>,
    "handler":                  (handleGroup) => <Handler handleGroup={handleGroup}/>,
    "edit-permission":          (permission) => <EditPermission permission={permission}/>,
    "handle-group":             (handleGroups) => <HandleGroup handleGroups={handleGroups}/>,
    "permission-list":          (entity, entityID) => <PermissionList entity={entity} entityID={entityID}/>,
    "show-modal":               (entity, data, columns) => <ShowModal entity={entity} data={data} columns={columns}/>,
    "delete-modal":             (entity, entityID, deletedRows, setDeletedRows) => <DeleteModal entity={entity} entityID={entityID} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "no-contexts":              () => <div className="user-no-perm" style="margin-top: 0;"> Context has no handle groups! </div>,
    "default":                  (componentKey) => <div>{componentKey} Component Not Found</div>

}

const getComponent = (componentKey, ...params) =>
{
    if (componentMap.hasOwnProperty(componentKey)) {
        return componentMap[componentKey](...params)
    } else {
        return componentMap["default"](componentKey)
    }
}

export default getComponent