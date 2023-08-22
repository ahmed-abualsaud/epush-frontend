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
import ListOrders from '../component/Order/ListOrders'
import AddOrder from '../component/Order/AddOrder'
import ShowOrder from '../component/Order/ShowOrder'
import ListCountries from '../component/Country/ListCountries'
import ShowCountry from '../component/Country/ShowCountry'
import EditCountry from '../component/Country/EditCountry'
import AddCountry from '../component/Country/AddCountry'
import DeleteCountry from '../component/Country/DeleteCountry'
import ListSMSCs from '../component/SMSC/ListSMSCs'
import AddSMSC from '../component/SMSC/AddSMSC'
import EditSMSC from '../component/SMSC/EditSMSC'
import ShowSMSC from '../component/SMSC/ShowSMSC'
import DeleteSMSC from '../component/SMSC/DeleteSMSC'
import NotFound from '../page/NotFound'
import ListOperators from '../component/Operator/ListOperators'
import AddOperator from '../component/Operator/AddOperator'
import ShowOperator from '../component/Operator/ShowOperator'
import EditOperator from '../component/Operator/EditOperator'
import DeleteOperator from '../component/Operator/DeleteOperator'
import ListSMSCBindings from '../component/SMSCBinding/ListSMSCBindings'
import ShowSMSCBinding from '../component/SMSCBinding/ShowSMSCBinding'
import AddSMSCBinding from '../component/SMSCBinding/AddSMSCBinding'
import DeleteSMSCBinding from '../component/SMSCBinding/DeleteSMSCBinding'
import EditSMSCBinding from '../component/SMSCBinding/EditSMSCBinding'
import ListSenders from '../component/Sender/ListSenders'
import AddSender from '../component/Sender/AddSender'
import ShowSender from '../component/Sender/ShowSender'
import DeleteSender from '../component/Sender/DeleteSender'
import EditSender from '../component/Sender/EditSender'
import ListSendersConnections from '../component/SenderConnection/ListSendersConnections'
import ShowSenderConnection from '../component/SenderConnection/ShowSenderConnection'
import DeleteSenderConnection from '../component/SenderConnection/DeleteSenderConnection'
import AddSenderConnection from '../component/SenderConnection/AddSenderConnection'
import EditSenderConnection from '../component/SenderConnection/EditSenderConnection'




const componentMap = {

    "home":                     () => <Home/>,
    "add-smsc":                 () => <AddSMSC/>,
    "add-user":                 () => <AddUser/>,
    "add-role":                 () => <AddRole/>,
    "add-sales":                () => <AddSales/>,
    "add-order":                () => <AddOrder/>,
    "add-admin":                () => <AddAdmin/>,
    "add-client":               () => <AddClient/>,
    "list-smscs":               () => <ListSMSCs/>,
    "list-roles":               () => <ListRoles/>,
    "list-sales":               () => <ListSales/>,
    "add-sender":               () => <AddSender/>,
    "list-orders":              () => <ListOrders/>,
    "add-country":              () => <AddCountry/>,
    "list-senders":             () => <ListSenders/>,
    "add-operator":             () => <AddOperator/>,
    "add-pricelist":            () => <AddPricelist/>,
    "list-operators":           () => <ListOperators/>,
    "list-countries":           () => <ListCountries/>,
    "list-pricelist":           () => <ListPricelist/>,
    "add-smsc-binding":         () => <AddSMSCBinding/>,
    "list-permissions":         () => <ListPermissions/>,
    "add-business-field":       () => <AddBusinessField/>,
    "add-payment-method":       () => <AddPaymentMethod/>,
    "list-smsc-bindings":       () => <ListSMSCBindings/>,
    "list-business-fields":     () => <ListBusinessFields/>,
    "list-payment-methods":     () => <ListPaymentMethods/>,
    "add-sender-connection":    () => <AddSenderConnection/>,
    "list-senders-connections": () => <ListSendersConnections/>,
    "profile":                  (user) => <Profile user={user}/>,
    "edit-smsc":                (smsc) => <EditSMSC smsc={smsc}/>,
    "show-smsc":                (smsc) => <ShowSMSC smsc={smsc}/>,
    "edit-user":                (user) => <EditUser user={user}/>,
    "show-role":                (role) => <ShowRole role={role}/>,
    "edit-role":                (role) => <EditRole role={role}/>,
    "show-user":                (user) => <ShowUser user={user}/>,
    "show-order":               (order) => <ShowOrder order={order}/>,
    "show-sales":               (sales) => <ShowSales sales={sales}/>,
    "edit-sales":               (sales) => <EditSales sales={sales}/>,
    "edit-admin":               (admin) => <EditAdmin admin={admin}/>,
    "show-admin":               (admin) => <ShowAdmin admin={admin}/>,
    "role-list":                (userID) => <RoleList userID={userID}/>,
    "edit-sender":              (sender) => <EditSender sender={sender}/>,
    "show-sender":              (sender) => <ShowSender sender={sender}/>,
    "show-client":              (client) => <ShowClient client={client}/>,
    "edit-client":              (client) => <EditClient client={client}/>,
    "show-country":             (country) => <ShowCountry country={country}/>,
    "edit-country":             (country) => <EditCountry country={country}/>,
    "all-services":             (services) =>   <Service services={services}/>,
    "show-operator":            (operator) => <ShowOperator operator={operator}/>,
    "edit-operator":            (operator) => <EditOperator operator={operator}/>,
    "service-contexts":         (service) => <ServiceContexts service={service}/>,
    "generate-password-modal":  (userID) => <GeneratePasswordModal userID={userID}/>,
    "show-pricelist":           (pricelist) => <ShowPricelist pricelist={pricelist}/>,
    "edit-pricelist":           (pricelist) => <EditPricelist pricelist={pricelist}/>,
    "handler":                  (handleGroup) => <Handler handleGroup={handleGroup}/>,
    "show-permission":          (permission) => <ShowPermission permission={permission}/>,
    "edit-permission":          (permission) => <EditPermission permission={permission}/>,
    "handle-group":             (handleGroups) => <HandleGroup handleGroups={handleGroups}/>,
    "show-smsc-binding":        (smscBinding) => <ShowSMSCBinding smscBinding={smscBinding}/>,
    "edit-smsc-binding":        (smscBinding) => <EditSMSCBinding smscBinding={smscBinding}/>,
    "list-users":               () => <TableContent tab="all"><ListUsers/></TableContent>,
    "list-admins":              () => <TableContent tab="admins"><ListAdmins/></TableContent>,
    "list-clients":             () => <TableContent tab="clients"><ListClients/></TableContent>,
    "show-business-field":      (businessField) => <ShowBusinessField businessField={businessField}/>,
    "edit-business-field":      (businessField) => <EditBusinessField businessField={businessField}/>,
    "show-payment-method":      (paymentMethod) => <ShowPaymentMethod paymentMethod={paymentMethod}/>,
    "edit-payment-method":      (paymentMethod) => <EditPaymentMethod paymentMethod={paymentMethod}/>,
    "permission-list":          (entity, entityID) => <PermissionList entity={entity} entityID={entityID}/>,
    "add-website-modal":        (addClientWebsite) => <AddWebsiteModal addClientWebsite={addClientWebsite}/>,
    "edit-sender-connection":   (senderConnection) => <EditSenderConnection senderConnection={senderConnection}/>,
    "show-sender-connection":   (senderconnection) => <ShowSenderConnection senderconnection={senderconnection}/>,
    "delete-role":              (role, deletedRows, setDeletedRows) => <DeleteRole role={role} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-smsc":              (smsc, deletedRows, setDeletedRows) => <DeleteSMSC smsc={smsc} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-user":              (user, deletedRows, setDeletedRows) => <DeleteUser user={user} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-admin":             (admin, deletedRows, setDeletedRows) => <DeleteAdmin admin={admin} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-sales":             (sales, deletedRows, setDeletedRows) => <DeleteSales sales={sales} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-client":            (client, deletedRows, setDeletedRows) => <DeleteClient client={client} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-sender":            (sender, deletedRows, setDeletedRows) => <DeleteSender sender={sender} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-country":           (country, deletedRows, setDeletedRows) =><DeleteCountry country={country} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-operator":          (operator, deletedRows, setDeletedRows) =><DeleteOperator operator={operator} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-pricelist":         (pricelist, deletedRows, setDeletedRows) => <DeletePricelist pricelist={pricelist} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-permission":        (permission, deletedRows, setDeletedRows) => <DeletePermission permission={permission} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-smsc-binding":      (smscBinding, deletedRows, setDeletedRows) => <DeleteSMSCBinding smscBinding={smscBinding} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-business-field":    (businessField, deletedRows, setDeletedRows) => <DeleteBusinessField businessField={businessField} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-payment-method":    (paymentMethod, deletedRows, setDeletedRows) => <DeletePaymentMethod paymentMethod={paymentMethod} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-sender-connection": (senderConnection, deletedRows, setDeletedRows) => <DeleteSenderConnection senderConnection={senderConnection} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "no-contexts":              () => <div className="user-no-perm" style={{marginTop: "0"}}> Context has no handle groups! </div>,
    "default":                  (componentKey) => <NotFound route={componentKey}/>,
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