import React, { lazy } from 'react';
const Home = lazy(() => import('../page/Home'));
const Profile = lazy(() => import('../page/Profile'));
const Service = lazy(() => import('../component/Orchi/Service'));
const Handler = lazy(() => import('../component/Orchi/Handler'));
const AddRole = lazy(() => import("../component/Role/AddRole"));
const AddSales = lazy(() => import('../component/Sales/AddSales'));
const EditUser = lazy(() => import('../component/User/EditUser'));
const EditRole = lazy(() => import('../component/Role/EditRole'));
const RoleList = lazy(() => import("../component/Role/RoleList"));
const EditAdmin = lazy(() => import('../component/Admin/EditAdmin'));
const EditSales = lazy(() => import('../component/Sales/EditSales'));
const ListSales = lazy(() => import('../component/Sales/ListSales'));
const ListRoles = lazy(() => import("../component/Role/ListRoles"));
const EditClient = lazy(() => import('../component/Client/EditClient'));
const TableContent = lazy(() => import('../layout/Shared/TableContent'));
const HandleGroup = lazy(() => import('../component/Orchi/HandleGroup'));
const ListAdmins = lazy(() => import('../component/Admin/ListAdmins'));
const ListClients = lazy(() => import('../component/Client/ListClients'));
const AddPricelist = lazy(() => import('../component/Pricelist/AddPricelist'));
const AddAdmin = lazy(() => import('../component/Admin/AddAdmin'));
const EditPricelist = lazy(() => import('../component/Pricelist/EditPricelist'));
const AddClient = lazy(() => import("../component/Client/AddClient"));
const ListPricelist = lazy(() => import('../component/Pricelist/ListPricelist'));
const EditPermission = lazy(() => import('../component/Permission/EditPermission'));
const PermissionList = lazy(() => import("../component/Permission/PermissionList"));
const AddUser = lazy(() => import("../component/User/AddUser"));
const ServiceContexts = lazy(() => import('../component/Orchi/ServiceContexts'));
const AddWebsiteModal = lazy(() => import('../component/Client/AddWebsiteModal'));
const ListPermissions = lazy(() => import("../component/Permission/ListPermissions"));
const AddBusinessField = lazy(() => import('../component/BusinessField/AddBusinessField'));
const AddPaymentMethod = lazy(() => import('../component/PaymentMethod/AddPaymentMethod'));
const EditBusinessField = lazy(() => import('../component/BusinessField/EditBusinessField'));
const EditPaymentMethod = lazy(() => import('../component/PaymentMethod/EditPaymentMethod'));
const ListBusinessFields = lazy(() => import('../component/BusinessField/ListBusinessFields'));
const ListPaymentMethods = lazy(() => import('../component/PaymentMethod/ListPaymentMethods'));
const GeneratePasswordModal = lazy(() => import("../component/Auth/GeneratePasswordModal"));
const ShowClient = lazy(() => import('../component/Client/ShowClient'));
const DeleteClient = lazy(() => import('../component/Client/DeleteClient'));
const ShowAdmin = lazy(() => import('../component/Admin/ShowAdmin'));
const DeleteAdmin = lazy(() => import('../component/Admin/DeleteAdmin'));
const ListUsers = lazy(() => import('../component/User/ListUsers'));
const DeleteUser = lazy(() => import('../component/User/DeleteUser'));
const ShowUser = lazy(() => import('../component/User/ShowUser'));
const ShowRole = lazy(() => import('../component/Role/ShowRole'));
const DeleteRole = lazy(() => import('../component/Role/DeleteRole'));
const ShowPermission = lazy(() => import('../component/Permission/ShowPermission'));
const DeletePermission = lazy(() => import('../component/Permission/DeletePermission'));
const ShowPricelist = lazy(() => import('../component/Pricelist/ShowPricelist'));
const DeletePricelist = lazy(() => import('../component/Pricelist/DeletePricelist'));
const ShowSales = lazy(() => import('../component/Sales/ShowSales'));
const DeleteSales = lazy(() => import('../component/Sales/DeleteSales'));
const ShowBusinessField = lazy(() => import('../component/BusinessField/ShowBusinessField'));
const DeleteBusinessField = lazy(() => import('../component/BusinessField/DeleteBusinessField'));
const ShowPaymentMethod = lazy(() => import('../component/PaymentMethod/ShowPaymentMethod'));
const DeletePaymentMethod = lazy(() => import('../component/PaymentMethod/DeletePaymentMethod'));
const ListOrders = lazy(() => import('../component/Order/ListOrders'));
const AddOrder = lazy(() => import('../component/Order/AddOrder'));
const ShowOrder = lazy(() => import('../component/Order/ShowOrder'));
const ListCountries = lazy(() => import('../component/Country/ListCountries'));
const ShowCountry = lazy(() => import('../component/Country/ShowCountry'));
const EditCountry = lazy(() => import('../component/Country/EditCountry'));
const AddCountry = lazy(() => import('../component/Country/AddCountry'));
const DeleteCountry = lazy(() => import('../component/Country/DeleteCountry'));
const ListSMSCs = lazy(() => import('../component/SMSC/ListSMSCs'));
const AddSMSC = lazy(() => import('../component/SMSC/AddSMSC'));
const EditSMSC = lazy(() => import('../component/SMSC/EditSMSC'));
const ShowSMSC = lazy(() => import('../component/SMSC/ShowSMSC'));
const DeleteSMSC = lazy(() => import('../component/SMSC/DeleteSMSC'));
const NotFound = lazy(() => import('../page/NotFound'));
const ListOperators = lazy(() => import('../component/Operator/ListOperators'));
const AddOperator = lazy(() => import('../component/Operator/AddOperator'));
const ShowOperator = lazy(() => import('../component/Operator/ShowOperator'));
const EditOperator = lazy(() => import('../component/Operator/EditOperator'));
const DeleteOperator = lazy(() => import('../component/Operator/DeleteOperator'));
const ListSMSCBindings = lazy(() => import('../component/SMSCBinding/ListSMSCBindings'));
const ShowSMSCBinding = lazy(() => import('../component/SMSCBinding/ShowSMSCBinding'));
const AddSMSCBinding = lazy(() => import('../component/SMSCBinding/AddSMSCBinding'));
const DeleteSMSCBinding = lazy(() => import('../component/SMSCBinding/DeleteSMSCBinding'));
const EditSMSCBinding = lazy(() => import('../component/SMSCBinding/EditSMSCBinding'));
const ListSenders = lazy(() => import('../component/Sender/ListSenders'));
const AddSender = lazy(() => import('../component/Sender/AddSender'));
const ShowSender = lazy(() => import('../component/Sender/ShowSender'));
const DeleteSender = lazy(() => import('../component/Sender/DeleteSender'));
const EditSender = lazy(() => import('../component/Sender/EditSender'));
const ListSendersConnections = lazy(() => import('../component/SenderConnection/ListSendersConnections'));
const ShowSenderConnection = lazy(() => import('../component/SenderConnection/ShowSenderConnection'));
const DeleteSenderConnection = lazy(() => import('../component/SenderConnection/DeleteSenderConnection'));
const AddSenderConnection = lazy(() => import('../component/SenderConnection/AddSenderConnection'));
const EditSenderConnection = lazy(() => import('../component/SenderConnection/EditSenderConnection'));
const AddSenderAndSenderConnection = lazy(() => import('../component/SenderConnection/AddSenderAndSenderConnection'));
const EditOrder = lazy(() => import('../component/Order/EditOrder'));
const ListMailTemplates = lazy(() => import('../component/Mail/MailTemplate/ListMailTemplates'));
const AddMailTemplate = lazy(() => import('../component/Mail/MailTemplate/AddMailTemplate'));
const DeleteMailTemplate = lazy(() => import('../component/Mail/MailTemplate/DeleteMailTemplate'));
const EditMailTemplate = lazy(() => import('../component/Mail/MailTemplate/EditMailTemplate'));
const ListMessageLanguages = lazy(() => import('../component/MessageLanguage/ListMessageLanguages'));
const AddMessageLanguage = lazy(() => import('../component/MessageLanguage/AddMessageLanguage'));
const DeleteMessageLanguage = lazy(() => import('../component/MessageLanguage/DeleteMessageLanguage'));
const ShowMessageLanguage = lazy(() => import('../component/MessageLanguage/ShowMessageLanguage'));
const EditMessageLanguage = lazy(() => import('../component/MessageLanguage/EditMessageLanguage'));
const ListMessages = lazy(() => import('../component/Message/ListMessages'));
const ShowMessage = lazy(() => import('../component/Message/ShowMessage'));
const DeleteMessage = lazy(() => import('../component/Message/DeleteMessage'));
const AddMessage = lazy(() => import('../component/Message/AddMessage'));
const ExtendableFormAddition = lazy(() => import('../component/MessageRecipient/AddRoutines/ExtendableFormAddition'));
const TextAreaAddition = lazy(() => import('../component/MessageRecipient/AddRoutines/TextAreaAddition'));
const FromFileAddition = lazy(() => import('../component/MessageRecipient/AddRoutines/FromFileAddition'));
const AddMessageSegments = lazy(() => import('../component/MessageSegment/AddMessageSegments'));
const ListMessageSegments = lazy(() => import('../component/MessageSegment/ListMessageSegments'));
const ListMessageRecipients = lazy(() => import('../component/MessageRecipient/ListMessageRecipients'));
const MessagesList = lazy(() => import('../layout/List/MessagesList'));
const WordFileExample = lazy(() => import('../component/MessageSegment/ImportParametersFileExamples/WordFileExample'));
const ExcelFileExample = lazy(() => import('../component/MessageSegment/ImportParametersFileExamples/ExcelFileExample'));
const TextFileExample = lazy(() => import('../component/MessageSegment/ImportParametersFileExamples/TextFileExample'));
const RecipientsGroupAddition = lazy(() => import('../component/MessageRecipient/AddRoutines/RecipientsGroupAddition'));
const ListMessageGroups = lazy(() => import('../component/MessageGroup/ListMessageGroups'));
const AddMessageGroup = lazy(() => import('../component/MessageGroup/AddMessageGroup'));
const ShowMessageGroup = lazy(() => import('../component/MessageGroup/ShowMessageGroup'));
const EditMessageGroup = lazy(() => import('../component/MessageGroup/EditMessageGroup'));
const DeleteMessageGroup = lazy(() => import('../component/MessageGroup/DeleteMessageGroup'));
const ListMessageGroupRecipients = lazy(() => import('../component/MessageGroupRecipient/ListMessageGroupRecipients'));
const AddMessageGroupRecipient = lazy(() => import('../component/MessageGroupRecipient/AddMessageGroupRecipient'));
const EditMessageGroupRecipient = lazy(() => import('../component/MessageGroupRecipient/EditMessageGroupRecipient'));
const DeleteMessageGroupRecipient = lazy(() => import('../component/MessageGroupRecipient/DeleteMessageGroupRecipient'));
const ImportRecipientsData = lazy(() => import('../component/MessageGroup/ImportRecipientsData'));
const ListSettings = lazy(() => import('../component/Settings/ListSettings'));
const EditSettings = lazy(() => import('../component/Settings/EditSettings'));
const AddSettings = lazy(() => import('../component/Settings/AddSettings'));
const ShowSettings = lazy(() => import('../component/Settings/ShowSettings'));
const DeleteSettings = lazy(() => import('../component/Settings/DeleteSettings'));
const ListApprovedMessages = lazy(() => import('../component/Message/ListApprovedMessages'));
const SMSManagement = lazy(() => import('../component/SMS/SMSManagement'));
const ListMessageFilters = lazy(() => import('../component/MessageFilter/ListMessageFilters'));
const AddMessageFilter = lazy(() => import('../component/MessageFilter/AddMessageFilter'));
const EditMessageFilter = lazy(() => import('../component/MessageFilter/EditMessageFilter'));
const ShowMessageFilter = lazy(() => import('../component/MessageFilter/ShowMessageFilter'));
const DeleteMessageFilter = lazy(() => import('../component/MessageFilter/DeleteMessageFilter'));
const CensoredWord = lazy(() => import('../component/MessageFilter/CensoredWord'));
const MailManagement = lazy(() => import('../component/Mail/MailManagement'));
const ListMailSendingHandlers = lazy(() => import('../component/Mail/MailSendingHandler/ListMailSendingHandlers'));
const AddMailSendingHandler = lazy(() => import('../component/Mail/MailSendingHandler/AddMailSendingHandler'));
const AddMailSendingTemplate = lazy(() => import('../component/Mail/MailSendingHandler/AddMailSendingTemplate'));
const AddMailSendingName = lazy(() => import('../component/Mail/MailSendingHandler/AddMailSendingName'));
const DeleteMailSendingHandler = lazy(() => import('../component/Mail/MailSendingHandler/DeleteMailSendingHandler'));
const AddNewMailTemplate = lazy(() => import('../component/Mail/MailSendingHandler/AddNewMailTemplate'));
const DataCellDetails = lazy(() => import('../layout/Table/DataCellDetails'));
const ListSMSSendingHandlers = lazy(() => import('../component/SMS/SMSSendingHandler/ListSMSSendingHandlers'));
const AddSMSSendingHandler = lazy(() => import('../component/SMS/SMSSendingHandler/AddSMSSendingHandler'));
const AddSMSSendingTemplate = lazy(() => import('../component/SMS/SMSSendingHandler/AddSMSSendingTemplate'));
const AddSMSSendingName = lazy(() => import('../component/SMS/SMSSendingHandler/AddSMSSendingName'));
const DeleteSMSSendingHandler = lazy(() => import('../component/SMS/SMSSendingHandler/DeleteSMSSendingHandler'));
const AddNewSMSTemplate = lazy(() => import('../component/SMS/SMSSendingHandler/AddNewSMSTemplate'));
const NotificationManagement = lazy(() => import('../component/Notification/NotificationManagement'));
const ListNotificationSendingHandlers = lazy(() => import('../component/Notification/NotificationSendingHandler/ListNotificationSendingHandlers'));
const AddNotificationSendingHandler = lazy(() => import('../component/Notification/NotificationSendingHandler/AddNotificationSendingHandler'));
const AddNotificationSendingTemplate = lazy(() => import('../component/Notification/NotificationSendingHandler/AddNotificationSendingTemplate'));
const AddNewNotificationTemplate = lazy(() => import('../component/Notification/NotificationSendingHandler/AddNewNotificationTemplate'));
const AddNotificationSendingName = lazy(() => import('../component/Notification/NotificationSendingHandler/AddNotificationSendingName'));
const DeleteNotificationSendingHandler = lazy(() => import('../component/Notification/NotificationSendingHandler/DeleteNotificationSendingHandler'));
const DeleteNotificationTemplate = lazy(() => import('../component/Notification/NotificationTemplate/DeleteNotificationTemplate'));
const DeleteSMSTemplate = lazy(() => import('../component/SMS/SMSTemplate/DeleteSMSTemplate'));
const ListUnreadNotifications = lazy(() => import('../component/Notification/ListUnreadNotifications'));
const ListUserNotifications = lazy(() => import('../component/Notification/ListUserNotifications'));







const componentMap = {

    "home":                                 () => <Home/>,
    "add-smsc":                             () => <AddSMSC/>,
    "add-user":                             () => <AddUser/>,
    "add-role":                             () => <AddRole/>,
    "add-sales":                            () => <AddSales/>,
    "add-order":                            () => <AddOrder/>,
    "add-admin":                            () => <AddAdmin/>,
    "add-client":                           () => <AddClient/>,
    "list-smscs":                           () => <ListSMSCs/>,
    "list-roles":                           () => <ListRoles/>,
    "list-sales":                           () => <ListSales/>,
    "add-sender":                           () => <AddSender/>,
    "list-orders":                          () => <ListOrders/>,
    "add-country":                          () => <AddCountry/>,
    "add-message":                          () => <AddMessage/>,
    "list-senders":                         () => <ListSenders/>,
    "add-operator":                         () => <AddOperator/>,
    "add-settings":                         () => <AddSettings/>,
    "list-settings":                        () => <ListSettings/>,
    "list-messages":                        () => <ListMessages/>,
    "add-pricelist":                        () => <AddPricelist/>,
    "list-operators":                       () => <ListOperators/>,
    "list-countries":                       () => <ListCountries/>,
    "sms-management":                       () => <SMSManagement/>,
    "list-pricelist":                       () => <ListPricelist/>,
    "mail-management":                      () => <MailManagement/>,
    "add-smsc-binding":                     () => <AddSMSCBinding/>,
    "add-message-group":                    () => <AddMessageGroup/>,
    "text-file-example":                    () => <TextFileExample/>,
    "word-file-example":                    () => <WordFileExample/>,
    "list-permissions":                     () => <ListPermissions/>,
    "add-message-filter":                   () => <AddMessageFilter/>,
    "add-business-field":                   () => <AddBusinessField/>,
    "add-payment-method":                   () => <AddPaymentMethod/>,
    "list-smsc-bindings":                   () => <ListSMSCBindings/>,
    "excel-file-example":                   () => <ExcelFileExample/>,
    "list-mail-templates":                  () => <ListMailTemplates/>,
    "list-message-groups":                  () => <ListMessageGroups/>,
    "list-message-filters":                 () => <ListMessageFilters/>,
    "list-business-fields":                 () => <ListBusinessFields/>,
    "list-payment-methods":                 () => <ListPaymentMethods/>,
    "add-message-language":                 () => <AddMessageLanguage/>,
    "add-sender-connection":                () => <AddSenderConnection/>,
    "list-message-segments":                () => <ListMessageSegments/>,
    "list-message-languages":               () => <ListMessageLanguages/>,
    "list-approved-messages":               () => <ListApprovedMessages/>,
    "add-sms-sending-handler":              () => <AddSMSSendingHandler/>,
    "list-message-recipients":              () => <ListMessageRecipients/>,
    "add-mail-sending-handler":             () => <AddMailSendingHandler/>,
    "notification-management":              () => <NotificationManagement/>,
    "list-senders-connections":             () => <ListSendersConnections/>,
    "list-sms-sending-handlers":            () => <ListSMSSendingHandlers/>,
    "list-mail-sending-handlers":           () => <ListMailSendingHandlers/>,
    "add-message-group-recipient":          () => <AddMessageGroupRecipient/>,
    "list-message-group-recipients":        () => <ListMessageGroupRecipients/>,
    "add-sender-and-sender-connection":     () => <AddSenderAndSenderConnection/>,
    "add-notification-sending-handler":     () => <AddNotificationSendingHandler/>,
    "list-notification-sending-handlers":   () => <ListNotificationSendingHandlers/>,

    "list-users":                           () => <TableContent tab="all"><ListUsers/></TableContent>,
    "list-admins":                          () => <TableContent tab="admins"><ListAdmins/></TableContent>,
    "list-clients":                         () => <TableContent tab="clients"><ListClients/></TableContent>,

    "profile":                              (user) => <Profile user={user}/>,
    "edit-smsc":                            (smsc) => <EditSMSC smsc={smsc}/>,
    "show-smsc":                            (smsc) => <ShowSMSC smsc={smsc}/>,
    "edit-user":                            (user) => <EditUser user={user}/>,
    "show-role":                            (role) => <ShowRole role={role}/>,
    "edit-role":                            (role) => <EditRole role={role}/>,
    "show-user":                            (user) => <ShowUser user={user}/>,
    "show-order":                           (order) => <ShowOrder order={order}/>,
    "edit-order":                           (order) => <EditOrder order={order}/>,
    "show-sales":                           (sales) => <ShowSales sales={sales}/>,
    "edit-sales":                           (sales) => <EditSales sales={sales}/>,
    "edit-admin":                           (admin) => <EditAdmin admin={admin}/>,
    "show-admin":                           (admin) => <ShowAdmin admin={admin}/>,
    "role-list":                            (userID) => <RoleList userID={userID}/>,
    "edit-sender":                          (sender) => <EditSender sender={sender}/>,
    "show-sender":                          (sender) => <ShowSender sender={sender}/>,
    "show-client":                          (client) => <ShowClient client={client}/>,
    "edit-client":                          (client) => <EditClient client={client}/>,
    "show-message":                         (message) => <ShowMessage message={message}/>,
    "show-country":                         (country) => <ShowCountry country={country}/>,
    "edit-country":                         (country) => <EditCountry country={country}/>,
    "all-services":                         (services) =>   <Service services={services}/>,
    "message-list":                         (messages) => <MessagesList messages={messages}/>,
    "edit-settings":                        (settings) => <EditSettings settings={settings}/>,
    "show-settings":                        (settings) => <ShowSettings settings={settings}/>,
    "show-operator":                        (operator) => <ShowOperator operator={operator}/>,
    "edit-operator":                        (operator) => <EditOperator operator={operator}/>,
    "service-contexts":                     (service) => <ServiceContexts service={service}/>,
    "default":                              (componentKey) => <NotFound route={componentKey}/>,
    "add-new-sms-template":                 (handler) => <AddNewSMSTemplate handler={handler}/>,
    'list-user-notifications':              (userID) => <ListUserNotifications userID={userID}/>,
    "add-new-mail-template":                (handler) => <AddNewMailTemplate handler={handler}/>,
    "generate-password-modal":              (userID) => <GeneratePasswordModal userID={userID}/>,
    "show-pricelist":                       (pricelist) => <ShowPricelist pricelist={pricelist}/>,
    "edit-pricelist":                       (pricelist) => <EditPricelist pricelist={pricelist}/>,
    "handler":                              (handleGroup) => <Handler handleGroup={handleGroup}/>,
    "add-mail-template":                    (templates) => <AddMailTemplate templates={templates}/>,
    "add-sms-sending-template":             (handler) => <AddSMSSendingTemplate handler={handler}/>,
    "add-mail-sending-template":            (handler) => <AddMailSendingTemplate handler={handler}/>,
    "show-permission":                      (permission) => <ShowPermission permission={permission}/>,
    "edit-permission":                      (permission) => <EditPermission permission={permission}/>,
    "handle-group":                         (handleGroups) => <HandleGroup handleGroups={handleGroups}/>,
    "add-new-notification-template":        (handler) => <AddNewNotificationTemplate handler={handler}/>,
    "show-smsc-binding":                    (smscBinding) => <ShowSMSCBinding smscBinding={smscBinding}/>,
    "edit-smsc-binding":                    (smscBinding) => <EditSMSCBinding smscBinding={smscBinding}/>,
    "add-notification-sending-template":    (handler) => <AddNotificationSendingTemplate handler={handler}/>,
    "show-message-group":                   (messageGroup) => <ShowMessageGroup messageGroup={messageGroup}/>,
    "edit-message-group":                   (messageGroup) => <EditMessageGroup messageGroup={messageGroup}/>,
    "data-cell-details":                    (column, value) => <DataCellDetails column={column} value={value}/>,
    "edit-message-filter":                  (messageFilter) => <EditMessageFilter messageFilter={messageFilter}/>,
    "show-message-filter":                  (messageFilter) => <ShowMessageFilter messageFilter={messageFilter}/>,
    "show-business-field":                  (businessField) => <ShowBusinessField businessField={businessField}/>,
    "edit-business-field":                  (businessField) => <EditBusinessField businessField={businessField}/>,
    "show-payment-method":                  (paymentMethod) => <ShowPaymentMethod paymentMethod={paymentMethod}/>,
    "edit-payment-method":                  (paymentMethod) => <EditPaymentMethod paymentMethod={paymentMethod}/>,
    "permission-list":                      (entity, entityID) => <PermissionList entity={entity} entityID={entityID}/>,
    "add-website-modal":                    (addClientWebsite) => <AddWebsiteModal addClientWebsite={addClientWebsite}/>,
    "show-message-language":                (messageLanguage) => <ShowMessageLanguage messageLanguage={messageLanguage}/>,
    "edit-message-language":                (messageLanguage) => <EditMessageLanguage messageLanguage={messageLanguage}/>,
    "edit-sender-connection":               (senderConnection) => <EditSenderConnection senderConnection={senderConnection}/>,
    "show-sender-connection":               (senderconnection) => <ShowSenderConnection senderconnection={senderconnection}/>,
    "add-sms-sending-name":                 (template, handler) => <AddSMSSendingName template={template} handler={handler}/>,
    "add-mail-sending-name":                (template, handler) => <AddMailSendingName template={template} handler={handler}/>,
    "from-file-addition":                   (setGroupRecipients) => <FromFileAddition setGroupRecipients={setGroupRecipients}/>,
    "text-area-addition":                   (setGroupRecipients) => <TextAreaAddition setGroupRecipients={setGroupRecipients}/>,
    "edit-mail-template":                   (template, templates) => <EditMailTemplate template={template} templates={templates}/>,
    "import-recipients-data":               (setGroupRecipients) => <ImportRecipientsData setGroupRecipients={setGroupRecipients}/>,
    "censored-word":                        (word, blacklistedWord) => <CensoredWord word={word} blacklistedWord={blacklistedWord}/>,
    "extendable-form-addition":             (setGroupRecipients) => <ExtendableFormAddition setGroupRecipients={setGroupRecipients}/>,
    "add-notification-sending-name":        (template, handler) => <AddNotificationSendingName template={template} handler={handler}/>,
    "edit-message-group-recipient":         (messageGroupRecipient) => <EditMessageGroupRecipient messageGroupRecipient={messageGroupRecipient}/>,
    "recipients-group-addition":            (userID, setGroupRecipients) => <RecipientsGroupAddition userID={userID} setGroupRecipients={setGroupRecipients}/>,
    "add-message-segments":                 (sender, order, language, groupRecipients) => <AddMessageSegments sender={sender} order={order} language={language} groupRecipients={groupRecipients}/>,
    "list-unread-notifications":            (userID, expanded, countUnreadNotifications) => <ListUnreadNotifications userID={userID} expanded={expanded} countUnreadNotifications={countUnreadNotifications}/>,


    "delete-role":                          (role, deletedRows, setDeletedRows) => <DeleteRole role={role} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-smsc":                          (smsc, deletedRows, setDeletedRows) => <DeleteSMSC smsc={smsc} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-user":                          (user, deletedRows, setDeletedRows) => <DeleteUser user={user} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-admin":                         (admin, deletedRows, setDeletedRows) => <DeleteAdmin admin={admin} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-sales":                         (sales, deletedRows, setDeletedRows) => <DeleteSales sales={sales} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-client":                        (client, deletedRows, setDeletedRows) => <DeleteClient client={client} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-sender":                        (sender, deletedRows, setDeletedRows) => <DeleteSender sender={sender} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-country":                       (country, deletedRows, setDeletedRows) => <DeleteCountry country={country} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-message":                       (message, deletedRows, setDeletedRows) => <DeleteMessage message={message} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-operator":                      (operator, deletedRows, setDeletedRows) => <DeleteOperator operator={operator} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-settings":                      (settings, deletedRows, setDeletedRows) => <DeleteSettings settings={settings} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-sms-template":                  (template, deletedRows, setDeletedRows) => <DeleteSMSTemplate template={template} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-pricelist":                     (pricelist, deletedRows, setDeletedRows) => <DeletePricelist pricelist={pricelist} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-mail-template":                 (template, deletedRows, setDeletedRows) => <DeleteMailTemplate template={template} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-permission":                    (permission, deletedRows, setDeletedRows) => <DeletePermission permission={permission} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-smsc-binding":                  (smscBinding, deletedRows, setDeletedRows) => <DeleteSMSCBinding smscBinding={smscBinding} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-notification-template":         (template, deletedRows, setDeletedRows) => <DeleteNotificationTemplate template={template} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-message-group":                 (messageGroup, deletedRows, setDeletedRows) => <DeleteMessageGroup messageGroup={messageGroup} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-message-filter":                (messageFilter, deletedRows, setDeletedRows) => <DeleteMessageFilter messageFilter={messageFilter} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-business-field":                (businessField, deletedRows, setDeletedRows) => <DeleteBusinessField businessField={businessField} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-payment-method":                (paymentMethod, deletedRows, setDeletedRows) => <DeletePaymentMethod paymentMethod={paymentMethod} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-message-language":              (messageLanguage, deletedRows, setDeletedRows) => <DeleteMessageLanguage messageLanguage={messageLanguage} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-sender-connection":             (senderConnection, deletedRows, setDeletedRows) => <DeleteSenderConnection senderConnection={senderConnection} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-sms-sending-handler":           (smsSendingHandler, deletedRows, setDeletedRows) => <DeleteSMSSendingHandler smsSendingHandler={smsSendingHandler} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-mail-sending-handler":          (mailSendingHandler, deletedRows, setDeletedRows) => <DeleteMailSendingHandler mailSendingHandler={mailSendingHandler} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-message-group-recipient":       (messageGroupRecipient, deletedRows, setDeletedRows) => <DeleteMessageGroupRecipient messageGroupRecipient={messageGroupRecipient} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,
    "delete-notification-sending-handler":  (notificationSendingHandler, deletedRows,setDeletedRows) => <DeleteNotificationSendingHandler notificationSendingHandler={notificationSendingHandler} deletedRows={deletedRows} setDeletedRows={setDeletedRows}/>,


    "no-contexts":                          () => <div className="no-data" style={{marginTop: "0"}}> Context has no handle groups! </div>,
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