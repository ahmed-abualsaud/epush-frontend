import Home from '../page/Home'
import Profile from '../page/Profile'
import Service from '../component/Orchi/Service'
import Handler from '../component/Orchi/Handler'
import AddRole from "../component/Role/AddRole"
import AddSales from '../component/Sales/AddSales'
import EditUser from '../component/User/EditUser'
import EditRole from '../component/Role/EditRole'
import RoleList from "../component/Role/RoleList"
import EditAdmin from '../component/Admin/EditAdmin'
import EditSales from '../component/Sales/EditSales'
import ListSales from '../component/Sales/ListSales'
import ListRoles from "../component/Role/ListRoles"
import EditClient from '../component/Client/EditClient'
import TableContent from '../layout/Shared/TableContent'
import HandleGroup from '../component/Orchi/HandleGroup'
import ListAdmins from '../component/Admin/ListAdmins'
import ListClients from '../component/Client/ListClients'
import AddPricelist from '../component/Pricelist/AddPricelist'
import AddAdmin from '../component/Admin/AddAdmin'
import EditPricelist from '../component/Pricelist/EditPricelist'
import AddClient from "../component/Client/AddClient"
import ListPricelist from '../component/Pricelist/ListPricelist'
import EditPermission from '../component/Permission/EditPermission'
import PermissionList from "../component/Permission/PermissionList"
import AddUser from "../component/User/AddUser"
import ServiceContexts from '../component/Orchi/ServiceContexts'
import AddWebsiteModal from '../component/Client/AddWebsiteModal'
import ListPermissions from "../component/Permission/ListPermissions"
import AddBusinessField from '../component/BusinessField/AddBusinessField'
import AddPaymentMethod from '../component/PaymentMethod/AddPaymentMethod'
import EditBusinessField from '../component/BusinessField/EditBusinessField'
import EditPaymentMethod from '../component/PaymentMethod/EditPaymentMethod'
import ListBusinessFields from '../component/BusinessField/ListBusinessFields'
import ListPaymentMethods from '../component/PaymentMethod/ListPaymentMethods'
import GeneratePasswordModal from "../component/Auth/GeneratePasswordModal"
import ShowClient from '../component/Client/ShowClient'
import DeleteClient from '../component/Client/DeleteClient'
import ShowAdmin from '../component/Admin/ShowAdmin'
import DeleteAdmin from '../component/Admin/DeleteAdmin'
import ListUsers from '../component/User/ListUsers'
import DeleteUser from '../component/User/DeleteUser'
import ShowUser from '../component/User/ShowUser'
import ShowRole from '../component/Role/ShowRole'
import DeleteRole from '../component/Role/DeleteRole'
import ShowPermission from '../component/Permission/ShowPermission'
import DeletePermission from '../component/Permission/DeletePermission'
import ShowPricelist from '../component/Pricelist/ShowPricelist'
import DeletePricelist from '../component/Pricelist/DeletePricelist'
import ShowSales from '../component/Sales/ShowSales'
import DeleteSales from '../component/Sales/DeleteSales'
import ShowBusinessField from '../component/BusinessField/ShowBusinessField'
import DeleteBusinessField from '../component/BusinessField/DeleteBusinessField'
import ShowPaymentMethod from '../component/PaymentMethod/ShowPaymentMethod'
import DeletePaymentMethod from '../component/PaymentMethod/DeletePaymentMethod'




const componentMap = {

    "home":                     () => <Home/>,
    "add-user":                 () => <AddUser/>,
    "add-role":                 () => <AddRole/>,
    "add-sales":                () => <AddSales/>,
    "add-admin":                () => <AddAdmin/>,
    "add-client":               () => <AddClient/>,
    "list-users":               () => <ListUsers/>,
    "list-roles":               () => <ListRoles/>,
    "sales-table":              () => <ListSales/>,
    "list-admins":              () => <ListAdmins/>,
    "list-clients":             () => <ListClients/>,
    "table-content":            () => <TableContent/>,
    "add-pricelist":            () => <AddPricelist/>,
    "pricelist-table":          () => <ListPricelist/>,
    "list-permissions":        () => <ListPermissions/>,
    "add-business-field":       () => <AddBusinessField/>,
    "add-payment-method":       () => <AddPaymentMethod/>,
    "business-field-table":     () => <ListBusinessFields/>,
    "payment-method-table":     () => <ListPaymentMethods/>,
    "profile":                  (user) => <Profile user={user}/>,
    "edit-user":                (user) => <EditUser user={user}/>,
    "show-role":                (role) => <ShowRole role={role}/>,
    "edit-role":                (role) => <EditRole role={role}/>,
    "show-user":                (user) => <ShowUser user={user}/>,
    "show-sales":               (sales) => <ShowSales sales={sales}/>,
    "edit-sales":               (sales) => <EditSales sales={sales}/>,
    "edit-admin":               (admin) => <EditAdmin admin={admin}/>,
    "show-admin":               (admin) => <ShowAdmin admin={admin}/>,
    "role-list":                (userID) => <RoleList userID={userID}/>,
    "show-client":              (client) => <ShowClient client={client}/>,
    "edit-client":              (client) => <EditClient client={client}/>,
    "all-services":             (services) =>   <Service services={services}/>,
    "service-contexts":         (service) => <ServiceContexts service={service}/>,
    "generate-password-modal":  (userID) => <GeneratePasswordModal userID={userID}/>,
    "show-pricelist":           (pricelist) => <ShowPricelist pricelist={pricelist}/>,
    "edit-pricelist":           (pricelist) => <EditPricelist pricelist={pricelist}/>,
    "handler":                  (handleGroup) => <Handler handleGroup={handleGroup}/>,
    "show-permission":          (permission) => <ShowPermission permission={permission}/>,
    "edit-permission":          (permission) => <EditPermission permission={permission}/>,
    "handle-group":             (handleGroups) => <HandleGroup handleGroups={handleGroups}/>,
    "show-business-field":      (businessField) => <ShowBusinessField businessField={businessField}/>,
    "edit-business-field":      (businessField) => <EditBusinessField businessField={businessField}/>,
    "show-payment-method":      (paymentMethod) => <ShowPaymentMethod paymentMethod={paymentMethod}/>,
    "edit-payment-method":      (paymentMethod) => <EditPaymentMethod paymentMethod={paymentMethod}/>,
    "permission-list":          (entity, entityID) => <PermissionList entity={entity} entityID={entityID}/>,
    "add-website-modal":        (addClientWebsite) => <AddWebsiteModal addClientWebsite={addClientWebsite}/>,
    "delete-role":              (role, deletedRows, setDeletedRows) => <DeleteRole role={role} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-user":              (user, deletedRows, setDeletedRows) => <DeleteUser user={user} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-admin":             (admin, deletedRows, setDeletedRows) => <DeleteAdmin admin={admin} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-sales":             (sales, deletedRows, setDeletedRows) => <DeleteSales sales={sales} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-client":            (client, deletedRows, setDeletedRows) => <DeleteClient client={client} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-pricelist":         (pricelist, deletedRows, setDeletedRows) => <DeletePricelist pricelist={pricelist} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-permission":        (permission, deletedRows, setDeletedRows) => <DeletePermission permission={permission} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-business-field":    (businessField, deletedRows, setDeletedRows) => <DeleteBusinessField businessField={businessField} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-payment-method":    (paymentMethod, deletedRows, setDeletedRows) => <DeletePaymentMethod paymentMethod={paymentMethod} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "no-contexts":              () => <div className="user-no-perm" style={{marginTop: "0"}}> Context has no handle groups! </div>,
    "default":                  (componentKey) => <div>{componentKey} Component Not Found</div>,
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