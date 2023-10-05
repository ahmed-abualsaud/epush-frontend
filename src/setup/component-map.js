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
import AddSenderAndSenderConnection from '../component/SenderConnection/AddSenderAndSenderConnection'
import EditOrder from '../component/Order/EditOrder'
import ListMailTemplates from '../component/MailTemplate/ListMailTemplates'
import AddMailTemplate from '../component/MailTemplate/AddMailTemplate'
import DeleteMailTemplate from '../component/MailTemplate/DeleteMailTemplate'
import EditMailTemplate from '../component/MailTemplate/EditMailTemplate'
import ListMessageLanguages from '../component/MessageLanguage/ListMessageLanguages'
import AddMessageLanguage from '../component/MessageLanguage/AddMessageLanguage'
import DeleteMessageLanguage from '../component/MessageLanguage/DeleteMessageLanguage'
import ShowMessageLanguage from '../component/MessageLanguage/ShowMessageLanguage'
import EditMessageLanguage from '../component/MessageLanguage/EditMessageLanguage'
import ListMessages from '../component/Message/ListMessages'
import ShowMessage from '../component/Message/ShowMessage'
import DeleteMessage from '../component/Message/DeleteMessage'
import AddMessage from '../component/Message/AddMessage'
import ExtendableFormAddition from '../component/MessageRecipient/AddRoutines/ExtendableFormAddition'
import TextAreaAddition from '../component/MessageRecipient/AddRoutines/TextAreaAddition'
import FromFileAddition from '../component/MessageRecipient/AddRoutines/FromFileAddition'
import AddMessageSegments from '../component/MessageSegment/AddMessageSegments'
import ListMessageSegments from '../component/MessageSegment/ListMessageSegments'
import ListMessageRecipients from '../component/MessageRecipient/ListMessageRecipients'
import MessagesList from '../layout/List/MessagesList'
import WordFileExample from '../component/MessageSegment/ImportParametersFileExamples/WordFileExample'
import ExcelFileExample from '../component/MessageSegment/ImportParametersFileExamples/ExcelFileExample'
import TextFileExample from '../component/MessageSegment/ImportParametersFileExamples/TextFileExample'
import RecipientsGroupAddition from '../component/MessageRecipient/AddRoutines/RecipientsGroupAddition'
import ListMessageGroups from '../component/MessageGroup/ListMessageGroups'
import AddMessageGroup from '../component/MessageGroup/AddMessageGroup'
import ShowMessageGroup from '../component/MessageGroup/ShowMessageGroup'
import EditMessageGroup from '../component/MessageGroup/EditMessageGroup'
import DeleteMessageGroup from '../component/MessageGroup/DeleteMessageGroup'
import ListMessageGroupRecipients from '../component/MessageGroupRecipient/ListMessageGroupRecipients'
import AddMessageGroupRecipient from '../component/MessageGroupRecipient/AddMessageGroupRecipient'
import EditMessageGroupRecipient from '../component/MessageGroupRecipient/EditMessageGroupRecipient'
import DeleteMessageGroupRecipient from '../component/MessageGroupRecipient/DeleteMessageGroupRecipient'
import ImportRecipientsData from '../component/MessageGroup/ImportRecipientsData'
import ListSettings from '../component/Settings/ListSettings'
import EditSettings from '../component/Settings/EditSettings'
import AddSettings from '../component/Settings/AddSettings'
import ShowSettings from '../component/Settings/ShowSettings'
import DeleteSettings from '../component/Settings/DeleteSettings'
import ListApprovedMessages from '../component/Message/ListApprovedMessages'
import SMSManagement from '../component/SMS/SMSManagement'
import ListMessageFilters from '../component/MessageFilter/ListMessageFilters'
import AddMessageFilter from '../component/MessageFilter/AddMessageFilter'
import EditMessageFilter from '../component/MessageFilter/EditMessageFilter'
import ShowMessageFilter from '../component/MessageFilter/ShowMessageFilter'
import DeleteMessageFilter from '../component/MessageFilter/DeleteMessageFilter'
import CensoredWord from '../component/MessageFilter/CensoredWord'







const componentMap = {

    "home":                             () => <Home/>,
    "add-smsc":                         () => <AddSMSC/>,
    "add-user":                         () => <AddUser/>,
    "add-role":                         () => <AddRole/>,
    "add-sales":                        () => <AddSales/>,
    "add-order":                        () => <AddOrder/>,
    "add-admin":                        () => <AddAdmin/>,
    "add-client":                       () => <AddClient/>,
    "list-smscs":                       () => <ListSMSCs/>,
    "list-roles":                       () => <ListRoles/>,
    "list-sales":                       () => <ListSales/>,
    "add-sender":                       () => <AddSender/>,
    "list-orders":                      () => <ListOrders/>,
    "add-country":                      () => <AddCountry/>,
    "add-message":                      () => <AddMessage/>,
    "list-senders":                     () => <ListSenders/>,
    "add-operator":                     () => <AddOperator/>,
    "add-settings":                     () => <AddSettings/>,
    "list-settings":                    () => <ListSettings/>,
    "list-messages":                    () => <ListMessages/>,
    "add-pricelist":                    () => <AddPricelist/>,
    "list-operators":                   () => <ListOperators/>,
    "list-countries":                   () => <ListCountries/>,
    "sms-management":                   () => <SMSManagement/>,
    "list-pricelist":                   () => <ListPricelist/>,
    "add-smsc-binding":                 () => <AddSMSCBinding/>,
    "add-message-group":                () => <AddMessageGroup/>,
    "text-file-example":                () => <TextFileExample/>,
    "word-file-example":                () => <WordFileExample/>,
    "list-permissions":                 () => <ListPermissions/>,
    "add-message-filter":               () => <AddMessageFilter/>,
    "add-business-field":               () => <AddBusinessField/>,
    "add-payment-method":               () => <AddPaymentMethod/>,
    "list-smsc-bindings":               () => <ListSMSCBindings/>,
    "excel-file-example":               () => <ExcelFileExample/>,
    "list-mail-templates":              () => <ListMailTemplates/>,
    "list-message-groups":              () => <ListMessageGroups/>,
    "list-message-filters":             () => <ListMessageFilters/>,
    "list-business-fields":             () => <ListBusinessFields/>,
    "list-payment-methods":             () => <ListPaymentMethods/>,
    "add-message-language":             () => <AddMessageLanguage/>,
    "add-sender-connection":            () => <AddSenderConnection/>,
    "list-message-segments":            () => <ListMessageSegments/>,
    "list-message-languages":           () => <ListMessageLanguages/>,
    "list-approved-messages":           () => <ListApprovedMessages/>,
    "list-message-recipients":          () => <ListMessageRecipients/>,
    "list-senders-connections":         () => <ListSendersConnections/>,
    "add-message-group-recipient":      () => <AddMessageGroupRecipient/>,
    "list-message-group-recipients":    () => <ListMessageGroupRecipients/>,
    "add-sender-and-sender-connection": () => <AddSenderAndSenderConnection/>,

    "profile":                          (user) => <Profile user={user}/>,
    "edit-smsc":                        (smsc) => <EditSMSC smsc={smsc}/>,
    "show-smsc":                        (smsc) => <ShowSMSC smsc={smsc}/>,
    "edit-user":                        (user) => <EditUser user={user}/>,
    "show-role":                        (role) => <ShowRole role={role}/>,
    "edit-role":                        (role) => <EditRole role={role}/>,
    "show-user":                        (user) => <ShowUser user={user}/>,
    "show-order":                       (order) => <ShowOrder order={order}/>,
    "edit-order":                       (order) => <EditOrder order={order}/>,
    "show-sales":                       (sales) => <ShowSales sales={sales}/>,
    "edit-sales":                       (sales) => <EditSales sales={sales}/>,
    "edit-admin":                       (admin) => <EditAdmin admin={admin}/>,
    "show-admin":                       (admin) => <ShowAdmin admin={admin}/>,
    "role-list":                        (userID) => <RoleList userID={userID}/>,
    "edit-sender":                      (sender) => <EditSender sender={sender}/>,
    "show-sender":                      (sender) => <ShowSender sender={sender}/>,
    "show-client":                      (client) => <ShowClient client={client}/>,
    "edit-client":                      (client) => <EditClient client={client}/>,
    "show-message":                     (message) => <ShowMessage message={message}/>,
    "show-country":                     (country) => <ShowCountry country={country}/>,
    "edit-country":                     (country) => <EditCountry country={country}/>,
    "all-services":                     (services) =>   <Service services={services}/>,
    "message-list":                     (messages) => <MessagesList messages={messages}/>,
    "edit-settings":                    (settings) => <EditSettings settings={settings}/>,
    "show-settings":                    (settings) => <ShowSettings settings={settings}/>,
    "show-operator":                    (operator) => <ShowOperator operator={operator}/>,
    "edit-operator":                    (operator) => <EditOperator operator={operator}/>,
    "service-contexts":                 (service) => <ServiceContexts service={service}/>,
    "default":                          (componentKey) => <NotFound route={componentKey}/>,
    "generate-password-modal":          (userID) => <GeneratePasswordModal userID={userID}/>,
    "show-pricelist":                   (pricelist) => <ShowPricelist pricelist={pricelist}/>,
    "edit-pricelist":                   (pricelist) => <EditPricelist pricelist={pricelist}/>,
    "handler":                          (handleGroup) => <Handler handleGroup={handleGroup}/>,
    "add-mail-template":                (templates) => <AddMailTemplate templates={templates}/>,
    "show-permission":                  (permission) => <ShowPermission permission={permission}/>,
    "edit-permission":                  (permission) => <EditPermission permission={permission}/>,
    "handle-group":                     (handleGroups) => <HandleGroup handleGroups={handleGroups}/>,
    "show-smsc-binding":                (smscBinding) => <ShowSMSCBinding smscBinding={smscBinding}/>,
    "edit-smsc-binding":                (smscBinding) => <EditSMSCBinding smscBinding={smscBinding}/>,
    "list-users":                       () => <TableContent tab="all"><ListUsers/></TableContent>,
    "list-admins":                      () => <TableContent tab="admins"><ListAdmins/></TableContent>,
    "list-clients":                     () => <TableContent tab="clients"><ListClients/></TableContent>,
    "show-message-group":               (messageGroup) => <ShowMessageGroup messageGroup={messageGroup}/>,
    "edit-message-group":               (messageGroup) => <EditMessageGroup messageGroup={messageGroup}/>,
    "edit-message-filter":              (messageFilter) => <EditMessageFilter messageFilter={messageFilter}/>,
    "show-message-filter":              (messageFilter) => <ShowMessageFilter messageFilter={messageFilter}/>,
    "show-business-field":              (businessField) => <ShowBusinessField businessField={businessField}/>,
    "edit-business-field":              (businessField) => <EditBusinessField businessField={businessField}/>,
    "show-payment-method":              (paymentMethod) => <ShowPaymentMethod paymentMethod={paymentMethod}/>,
    "edit-payment-method":              (paymentMethod) => <EditPaymentMethod paymentMethod={paymentMethod}/>,
    "permission-list":                  (entity, entityID) => <PermissionList entity={entity} entityID={entityID}/>,
    "add-website-modal":                (addClientWebsite) => <AddWebsiteModal addClientWebsite={addClientWebsite}/>,
    "show-message-language":            (messageLanguage) => <ShowMessageLanguage messageLanguage={messageLanguage}/>,
    "edit-message-language":            (messageLanguage) => <EditMessageLanguage messageLanguage={messageLanguage}/>,
    "edit-sender-connection":           (senderConnection) => <EditSenderConnection senderConnection={senderConnection}/>,
    "show-sender-connection":           (senderconnection) => <ShowSenderConnection senderconnection={senderconnection}/>,
    "from-file-addition":               (setGroupRecipients) => <FromFileAddition setGroupRecipients={setGroupRecipients}/>,
    "text-area-addition":               (setGroupRecipients) => <TextAreaAddition setGroupRecipients={setGroupRecipients}/>,
    "edit-mail-template":               (template, templates) => <EditMailTemplate template={template} templates={templates}/>,
    "import-recipients-data":           (setGroupRecipients) => <ImportRecipientsData setGroupRecipients={setGroupRecipients}/>,
    "censored-word":                    (word, blacklistedWord) => <CensoredWord word={word} blacklistedWord={blacklistedWord}/>,
    "extendable-form-addition":         (setGroupRecipients) => <ExtendableFormAddition setGroupRecipients={setGroupRecipients}/>,
    "edit-message-group-recipient":     (messageGroupRecipient) => <EditMessageGroupRecipient messageGroupRecipient={messageGroupRecipient}/>,
    "recipients-group-addition":        (userID, setGroupRecipients) => <RecipientsGroupAddition userID={userID} setGroupRecipients={setGroupRecipients}/>,
    "add-message-segments":             (sender, order, language, groupRecipients) => <AddMessageSegments sender={sender} order={order} language={language} groupRecipients={groupRecipients}/>,

    "delete-role":                      (role, deletedRows, setDeletedRows) => <DeleteRole role={role} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-smsc":                      (smsc, deletedRows, setDeletedRows) => <DeleteSMSC smsc={smsc} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-user":                      (user, deletedRows, setDeletedRows) => <DeleteUser user={user} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-admin":                     (admin, deletedRows, setDeletedRows) => <DeleteAdmin admin={admin} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-sales":                     (sales, deletedRows, setDeletedRows) => <DeleteSales sales={sales} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-client":                    (client, deletedRows, setDeletedRows) => <DeleteClient client={client} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-sender":                    (sender, deletedRows, setDeletedRows) => <DeleteSender sender={sender} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-country":                   (country, deletedRows, setDeletedRows) => <DeleteCountry country={country} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-message":                   (message, deletedRows, setDeletedRows) => <DeleteMessage message={message} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-operator":                  (operator, deletedRows, setDeletedRows) => <DeleteOperator operator={operator} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-settings":                  (settings, deletedRows, setDeletedRows) => <DeleteSettings settings={settings} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-pricelist":                 (pricelist, deletedRows, setDeletedRows) => <DeletePricelist pricelist={pricelist} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-mail-template":             (template, deletedRows, setDeletedRows) => <DeleteMailTemplate template={template} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-permission":                (permission, deletedRows, setDeletedRows) => <DeletePermission permission={permission} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-smsc-binding":              (smscBinding, deletedRows, setDeletedRows) => <DeleteSMSCBinding smscBinding={smscBinding} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-message-group":             (messageGroup, deletedRows, setDeletedRows) => <DeleteMessageGroup messageGroup={messageGroup} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-message-filter":            (messageFilter, deletedRows, setDeletedRows) => <DeleteMessageFilter messageFilter={messageFilter} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-business-field":            (businessField, deletedRows, setDeletedRows) => <DeleteBusinessField businessField={businessField} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-payment-method":            (paymentMethod, deletedRows, setDeletedRows) => <DeletePaymentMethod paymentMethod={paymentMethod} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-message-language":          (messageLanguage, deletedRows, setDeletedRows) => <DeleteMessageLanguage messageLanguage={messageLanguage} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-sender-connection":         (senderConnection, deletedRows, setDeletedRows) => <DeleteSenderConnection senderConnection={senderConnection} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-message-group-recipient":   (messageGroupRecipient, deletedRows, setDeletedRows) => <DeleteMessageGroupRecipient messageGroupRecipient={messageGroupRecipient} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,


    "no-contexts":                      () => <div className="user-no-perm" style={{marginTop: "0"}}> Context has no handle groups! </div>,
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