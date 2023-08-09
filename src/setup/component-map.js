import Home from '../page/Home'
import Profile from '../page/Profile'
import Service from '../component/Service'
import Handler from '../component/Handler'
import AddRole from "../component/AddRole"
import AddSales from '../component/AddSales'
import EditUser from '../component/EditUser'
import EditRole from '../component/EditRole'
import RoleList from "../component/RoleList"
import EditAdmin from '../component/EditAdmin'
import ShowModal from "../component/ShowModal"
import EditSales from '../component/EditSales'
import SalesTable from '../component/SalesTable'
import RolesTable from "../component/RolesTable"
import UsersTable from "../component/UsersTable"
import EditClient from '../component/EditClient'
import TableContent from '../layout/TableContent'
import HandleGroup from '../component/HandleGroup'
import AdminsTable from '../component/AdminsTable'
import DeleteModal from "../component/DeleteModal"
import ClientsTable from '../component/ClientsTable'
import AddUserModal from "../component/AddUserModal"
import ShowUserInfo from "../component/ShowUserInfo"
import AddPricelist from '../component/AddPricelist'
import AddAdminUser from '../component/AddAdminUser'
import EditPricelist from '../component/EditPricelist'
import AddClientUser from "../component/AddClientUser"
import PricelistTable from '../component/PricelistTable'
import EditPermission from '../component/EditPermission'
import PermissionList from "../component/PermissionList"
import AddGeneralUser from "../component/AddGeneralUser"
import ServiceContexts from '../component/ServiceContexts'
import AddWebsiteModal from '../component/AddWebsiteModal'
import PermissionsTable from "../component/PermissionsTable"
import AddBusinessField from '../component/AddBusinessField'
import AddPaymentMethod from '../component/AddPaymentMethod'
import EditBusinessField from '../component/EditBusinessField'
import EditPaymentMethod from '../component/EditPaymentMethod'
import BusinessFieldTable from '../component/BusinessFieldTable'
import PaymentMethodTable from '../component/PaymentMethodTable'
import GeneratePasswordModal from "../component/GeneratePasswordModal"




const componentMap = {

    "home":                     () => <Home/>,
    "add-role":                 () => <AddRole/>,
    "add-sales":                () => <AddSales/>,
    "sales-table":              () => <SalesTable/>,
    "users-table":              () => <UsersTable/>,
    "roles-table":              () => <RolesTable/>,
    "admins-table":             () => <AdminsTable/>,
    "clients-table":            () => <ClientsTable/>,
    "add-user-modal":           () => <AddUserModal/>,
    "table-content":            () => <TableContent/>,
    "add-pricelist":            () => <AddPricelist/>,
    "add-admin-user":           () => <AddAdminUser/>,
    "add-client-user":          () => <AddClientUser/>,
    "add-general-user":         () => <AddGeneralUser/>,
    "pricelist-table":          () => <PricelistTable/>,
    "permissions-table":        () => <PermissionsTable/>,
    "add-business-field":       () => <AddBusinessField/>,
    "add-payment-method":       () => <AddPaymentMethod/>,
    "business-field-table":     () => <BusinessFieldTable/>,
    "payment-method-table":     () => <PaymentMethodTable/>,
    "profile":                  (user) => <Profile user={user}/>,
    "edit-user":                (user) => <EditUser user={user}/>,
    "edit-role":                (role) => <EditRole role={role}/>,
    "edit-sales":               (sales) => <EditSales sales={sales}/>,
    "edit-admin":               (admin) => <EditAdmin admin={admin}/>,
    "role-list":                (userID) => <RoleList userID={userID}/>,
    "edit-client":              (client) => <EditClient client={client}/>,
    "all-services":             (services) =>   <Service services={services}/>,
    "service-contexts":         (service) => <ServiceContexts service={service}/>,
    "generate-password-modal":  (userID) => <GeneratePasswordModal userID={userID}/>,
    "edit-pricelist":           (pricelist) => <EditPricelist pricelist={pricelist}/>,
    "handler":                  (handleGroup) => <Handler handleGroup={handleGroup}/>,
    "edit-permission":          (permission) => <EditPermission permission={permission}/>,
    "show-user-info":           (row, isUser) => <ShowUserInfo user={row} isUser={isUser}/>,
    "handle-group":             (handleGroups) => <HandleGroup handleGroups={handleGroups}/>,
    "edit-business-field":      (businessField) => <EditBusinessField businessField={businessField}/>,
    "edit-payment-method":      (paymentMethod) => <EditPaymentMethod paymentMethod={paymentMethod}/>,
    "permission-list":          (entity, entityID) => <PermissionList entity={entity} entityID={entityID}/>,
    "add-website-modal":        (addClientWebsite) => <AddWebsiteModal addClientWebsite={addClientWebsite}/>,
    "show-modal":               (entity, data, columns) => <ShowModal entity={entity} data={data} columns={columns}/>,
    "delete-modal":             (entity, entityID, deletedRows, setDeletedRows) => <DeleteModal entity={entity} entityID={entityID} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
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