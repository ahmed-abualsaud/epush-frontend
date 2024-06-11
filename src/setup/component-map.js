import React, { lazy } from 'react'


const Home = lazy(() => import('../page/Home'))
const API = lazy(() => import('../component/Shared/API'))
const Profile = lazy(() => import('../page/Profile'))
const TopNav = lazy(() => import('../layout/Shared/TopNav'))
const Service = lazy(() => import('../component/Orchi/Service'))
const Handler = lazy(() => import('../component/Orchi/Handler'))
const AddRole = lazy(() => import("../component/Role/AddRole"))
const AddSales = lazy(() => import('../component/Sales/AddSales'))
const EditUser = lazy(() => import('../component/User/EditUser'))
const EditRole = lazy(() => import('../component/Role/EditRole'))
const RoleList = lazy(() => import("../component/Role/RoleList"))
const EditAdmin = lazy(() => import('../component/Admin/EditAdmin'))
const EditSales = lazy(() => import('../component/Sales/EditSales'))
const ListSales = lazy(() => import('../component/Sales/ListSales'))
const ListRoles = lazy(() => import("../component/Role/ListRoles"))
const EditClient = lazy(() => import('../component/Client/EditClient'))
const HandleGroup = lazy(() => import('../component/Orchi/HandleGroup'))
const ListAdmins = lazy(() => import('../component/Admin/ListAdmins'))
const ListClients = lazy(() => import('../component/Client/ListClients'))
const ClientProfile = lazy(() => import('../component/Client/ClientProfile'))
const AddPricelist = lazy(() => import('../component/Pricelist/AddPricelist'))
const AddBanner = lazy(() => import('../component/Banner/AddBanner'))
const AddAdmin = lazy(() => import('../component/Admin/AddAdmin'))
const DeletePartner = lazy(() => import('../component/Partner/DeletePartner'))
const ListPartners = lazy(() => import('../component/Partner/ListPartners'))
const ListBanners = lazy(() => import('../component/Banner/ListBanners'))
const EditBanner = lazy(() => import('../component/Banner/EditBanner'))
const EditPricelist = lazy(() => import('../component/Pricelist/EditPricelist'))
const AddClient = lazy(() => import("../component/Client/AddClient"))
const ListPricelist = lazy(() => import('../component/Pricelist/ListPricelist'))
const EditPermission = lazy(() => import('../component/Permission/EditPermission'))
const PermissionList = lazy(() => import("../component/Permission/PermissionList"))
const AddUser = lazy(() => import("../component/User/AddUser"))
const ListClientTickets = lazy(() => import('../component/Ticket/ListClientTickets'))
const ListClientSenders = lazy(() => import('../component/ClientSender/ListClientSenders'))
const ShowFile = lazy(() => import('../component/File/ShowFile'))
const JobManagement = lazy(() => import('../component/Queue/JobManagement'))
const QueueManagement = lazy(() => import('../component/Queue/QueueManagement'))
const ServiceContexts = lazy(() => import('../component/Orchi/ServiceContexts'))
const AddWebsiteModal = lazy(() => import('../component/Client/AddWebsiteModal'))
const ListPermissions = lazy(() => import("../component/Permission/ListPermissions"))
const AddBusinessField = lazy(() => import('../component/BusinessField/AddBusinessField'))
const AddPaymentMethod = lazy(() => import('../component/PaymentMethod/AddPaymentMethod'))
const EditBusinessField = lazy(() => import('../component/BusinessField/EditBusinessField'))
const UpdateUserAttribute = lazy(() => import('../component/User/UpdateUserAttribute'))
const EditPaymentMethod = lazy(() => import('../component/PaymentMethod/EditPaymentMethod'))
const ListBusinessFields = lazy(() => import('../component/BusinessField/ListBusinessFields'))
const ListPaymentMethods = lazy(() => import('../component/PaymentMethod/ListPaymentMethods'))
const GeneratePasswordModal = lazy(() => import("../component/Auth/GeneratePasswordModal"))
const ShowClient = lazy(() => import('../component/Client/ShowClient'))
const DeleteClient = lazy(() => import('../component/Client/DeleteClient'))
const ShowAdmin = lazy(() => import('../component/Admin/ShowAdmin'))
const DeleteAdmin = lazy(() => import('../component/Admin/DeleteAdmin'))
const ListUsers = lazy(() => import('../component/User/ListUsers'))
const EditTicket = lazy(() => import('../component/Ticket/EditTicket'))
const EditFolder = lazy(() => import('../component/Folder/EditFolder'))
const ListFolders = lazy(() => import('../component/Folder/ListFolders'))
const DeleteTicket = lazy(() => import('../component/Ticket/DeleteTicket'))
const ShowTicket = lazy(() => import('../component/Ticket/ShowTicket'))
const AddPartner = lazy(() => import('../component/Partner/AddPartner'))
const ListJobs = lazy(() => import('../component/Queue/ListJobs'))
const ListFailedJobs = lazy(() => import('../component/Queue/ListFailedJobs'))
const ClientMessageManagement = lazy(() => import('../component/ClientMessage/ClientMessageManagement'))
const ListTickets = lazy(() => import('../component/Ticket/ListTickets'))
const ClientFileManagement = lazy(() => import('../component/File/ClientFileManagement'))
const ClientSenderManagement = lazy(() => import('../component/ClientSender/ClientSenderManagement'))
const ListClientMessageRecipients = lazy(() => import('../component/ClientMessage/ListClientMessageRecipients'))
const ListClientMessageGroups = lazy(() => import('../component/ClientMessage/ListClientMessageGroups'))
const DeleteUser = lazy(() => import('../component/User/DeleteUser'))
const ShowUser = lazy(() => import('../component/User/ShowUser'))
const ClientTicketManagement = lazy(() => import('../component/Ticket/ClientTicketManagement'))
const AddFolder = lazy(() => import('../component/Folder/AddFolder'))
const UploadFile = lazy(() => import('../component/File/UploadFile'))
const AddClientMessage = lazy(() => import('../component/ClientMessage/AddClientMessage'))
const AddClientMessage2 = lazy(() => import('../component/ClientMessage/AddClientMessage2'))
const ShowRole = lazy(() => import('../component/Role/ShowRole'))
const ListClientSenderConnections = lazy(() => import('../component/ClientSender/ListClientSenderConnections'))
const GetFolderFiles = lazy(() => import('../component/Folder/GetFolderFiles'))
const DeleteRole = lazy(() => import('../component/Role/DeleteRole'))
const UploadFileToFolder = lazy(() => import('../component/File/UploadFileToFolder'))
const DeleteFile = lazy(() => import('../component/File/DeleteFile'))
const AddTicket = lazy(() => import('../component/Ticket/AddTicket'))
const ClientFiles = lazy(() => import('../component/File/ClientFiles'))
const ShowPermission = lazy(() => import('../component/Permission/ShowPermission'))
const DeletePermission = lazy(() => import('../component/Permission/DeletePermission'))
const ListScheduledMessages = lazy(() => import('../component/Message/ListScheduledMessages'))
const ShowBanner = lazy(() => import('../component/Banner/ShowBanner'))
const ShowPricelist = lazy(() => import('../component/Pricelist/ShowPricelist'))
const DeleteBanner = lazy(() => import('../component/Banner/DeleteBanner'))
const DeletePricelist = lazy(() => import('../component/Pricelist/DeletePricelist'))
const AddClientMessageGroup = lazy(() => import('../component/ClientMessage/AddClientMessageGroup'))
const ShowSales = lazy(() => import('../component/Sales/ShowSales'))
const ShowClientMessage = lazy(() => import('../component/ClientMessage/ShowClientMessage'))
const DeleteSales = lazy(() => import('../component/Sales/DeleteSales'))
const ShowBusinessField = lazy(() => import('../component/BusinessField/ShowBusinessField'))
const DeleteBusinessField = lazy(() => import('../component/BusinessField/DeleteBusinessField'))
const ShowPaymentMethod = lazy(() => import('../component/PaymentMethod/ShowPaymentMethod'))
const DeletePaymentMethod = lazy(() => import('../component/PaymentMethod/DeletePaymentMethod'))
const ListClientMessages = lazy(() => import('../component/ClientMessage/ListClientMessages'))
const ListOrders = lazy(() => import('../component/Order/ListOrders'))
const ShowJob = lazy(() => import('../component/Queue/ShowJob'))
const ShowFailedJob = lazy(() => import('../component/Queue/ShowFailedJob'))
const AddOrder = lazy(() => import('../component/Order/AddOrder'))
const EditPartner = lazy(() => import('../component/Partner/EditPartner'))
const ShowPartner = lazy(() => import('../component/Partner/ShowPartner'))
const ShowOrder = lazy(() => import('../component/Order/ShowOrder'))
const ListCountries = lazy(() => import('../component/Country/ListCountries'))
const ShowCountry = lazy(() => import('../component/Country/ShowCountry'))
const EditCountry = lazy(() => import('../component/Country/EditCountry'))
const AddCountry = lazy(() => import('../component/Country/AddCountry'))
const DeleteCountry = lazy(() => import('../component/Country/DeleteCountry'))
const ListSMSCs = lazy(() => import('../component/SMSC/ListSMSCs'))
const AddSMSC = lazy(() => import('../component/SMSC/AddSMSC'))
const EditSMSC = lazy(() => import('../component/SMSC/EditSMSC'))
const ShowSMSC = lazy(() => import('../component/SMSC/ShowSMSC'))
const DeleteSMSC = lazy(() => import('../component/SMSC/DeleteSMSC'))
const NotFound = lazy(() => import('../page/NotFound'))
const DeleteFolder = lazy(() => import('../component/Folder/DeleteFolder'))
const ItemsList = lazy(() => import('../layout/List/ItemsList'))
const ListOperators = lazy(() => import('../component/Operator/ListOperators'))
const AddOperator = lazy(() => import('../component/Operator/AddOperator'))
const ShowOperator = lazy(() => import('../component/Operator/ShowOperator'))
const EditOperator = lazy(() => import('../component/Operator/EditOperator'))
const DeleteOperator = lazy(() => import('../component/Operator/DeleteOperator'))
const ListSMSCBindings = lazy(() => import('../component/SMSCBinding/ListSMSCBindings'))
const ShowSMSCBinding = lazy(() => import('../component/SMSCBinding/ShowSMSCBinding'))
const AddSMSCBinding = lazy(() => import('../component/SMSCBinding/AddSMSCBinding'))
const DeleteSMSCBinding = lazy(() => import('../component/SMSCBinding/DeleteSMSCBinding'))
const EditSMSCBinding = lazy(() => import('../component/SMSCBinding/EditSMSCBinding'))
const ListSenders = lazy(() => import('../component/Sender/ListSenders'))
const AddSender = lazy(() => import('../component/Sender/AddSender'))
const ShowSender = lazy(() => import('../component/Sender/ShowSender'))
const DeleteSender = lazy(() => import('../component/Sender/DeleteSender'))
const EditSender = lazy(() => import('../component/Sender/EditSender'))
const AddClientSender = lazy(() => import('../component/ClientSender/AddClientSender'))
const InvalidRecipientsModal = lazy(() => import('../component/MessageGroupRecipient/InvalidRecipientsModal'))
const ListSendersConnections = lazy(() => import('../component/SenderConnection/ListSendersConnections'))
const ShowSenderConnection = lazy(() => import('../component/SenderConnection/ShowSenderConnection'))
const DeleteSenderConnection = lazy(() => import('../component/SenderConnection/DeleteSenderConnection'))
const AddSenderConnection = lazy(() => import('../component/SenderConnection/AddSenderConnection'))
const EditSenderConnection = lazy(() => import('../component/SenderConnection/EditSenderConnection'))
const ListClientMessageGroupRecipients = lazy(() => import('../component/ClientMessage/ListClientMessageGroupRecipients'))
const ListClientScheduledMessages = lazy(() => import('../component/ClientMessage/ListClientScheduledMessages'))
const ListClientUnapprovedMessages = lazy(() => import('../component/ClientMessage/ListClientUnapprovedMessages'))
const AddSenderAndSenderConnection = lazy(() => import('../component/SenderConnection/AddSenderAndSenderConnection'))
const EditOrder = lazy(() => import('../component/Order/EditOrder'))
const CancelScheduledMessage = lazy(() => import('../component/Message/CancelScheduledMessage'))
const ListMailTemplates = lazy(() => import('../component/Mail/MailTemplate/ListMailTemplates'))
const AddMailTemplate = lazy(() => import('../component/Mail/MailTemplate/AddMailTemplate'))
const DeleteMailTemplate = lazy(() => import('../component/Mail/MailTemplate/DeleteMailTemplate'))
const EditMailTemplate = lazy(() => import('../component/Mail/MailTemplate/EditMailTemplate'))
const ListMessageLanguages = lazy(() => import('../component/MessageLanguage/ListMessageLanguages'))
const AddMessageLanguage = lazy(() => import('../component/MessageLanguage/AddMessageLanguage'))
const DeleteMessageLanguage = lazy(() => import('../component/MessageLanguage/DeleteMessageLanguage'))
const ShowMessageLanguage = lazy(() => import('../component/MessageLanguage/ShowMessageLanguage'))
const EditMessageLanguage = lazy(() => import('../component/MessageLanguage/EditMessageLanguage'))
const ListMessages = lazy(() => import('../component/Message/ListMessages'))
const ShowMessage = lazy(() => import('../component/Message/ShowMessage'))
const DeleteMessage = lazy(() => import('../component/Message/DeleteMessage'))
const AddMessage = lazy(() => import('../component/Message/AddMessage'))
const ExtendableFormAddition = lazy(() => import('../component/MessageRecipient/AddRoutines/ExtendableFormAddition'))
const TextAreaAddition = lazy(() => import('../component/MessageRecipient/AddRoutines/TextAreaAddition'))
const FromFileAddition = lazy(() => import('../component/MessageRecipient/AddRoutines/FromFileAddition'))
const AddMessageSegments = lazy(() => import('../component/MessageSegment/AddMessageSegments'))
const ListMessageSegments = lazy(() => import('../component/MessageSegment/ListMessageSegments'))
const ListMessageRecipients = lazy(() => import('../component/MessageRecipient/ListMessageRecipients'))
const MessagesList = lazy(() => import('../layout/List/MessagesList'))
const WordFileExample = lazy(() => import('../component/MessageSegment/ImportParametersFileExamples/WordFileExample'))
const ExcelFileExample = lazy(() => import('../component/MessageSegment/ImportParametersFileExamples/ExcelFileExample'))
const TextFileExample = lazy(() => import('../component/MessageSegment/ImportParametersFileExamples/TextFileExample'))
const RecipientsGroupAddition = lazy(() => import('../component/MessageRecipient/AddRoutines/RecipientsGroupAddition'))
const ListMessageGroups = lazy(() => import('../component/MessageGroup/ListMessageGroups'))
const AddMessageGroup = lazy(() => import('../component/MessageGroup/AddMessageGroup'))
const ShowMessageGroup = lazy(() => import('../component/MessageGroup/ShowMessageGroup'))
const EditMessageGroup = lazy(() => import('../component/MessageGroup/EditMessageGroup'))
const DeleteMessageGroup = lazy(() => import('../component/MessageGroup/DeleteMessageGroup'))
const ListMessageGroupRecipients = lazy(() => import('../component/MessageGroupRecipient/ListMessageGroupRecipients'))
const AddMessageGroupRecipient = lazy(() => import('../component/MessageGroupRecipient/AddMessageGroupRecipient'))
const EditMessageGroupRecipient = lazy(() => import('../component/MessageGroupRecipient/EditMessageGroupRecipient'))
const DeleteMessageGroupRecipient = lazy(() => import('../component/MessageGroupRecipient/DeleteMessageGroupRecipient'))
const ImportRecipientsData = lazy(() => import('../component/MessageGroup/ImportRecipientsData'))
const ListSettings = lazy(() => import('../component/Settings/ListSettings'))
const EditSettings = lazy(() => import('../component/Settings/EditSettings'))
const AddSettings = lazy(() => import('../component/Settings/AddSettings'))
const ShowSettings = lazy(() => import('../component/Settings/ShowSettings'))
const DeleteSettings = lazy(() => import('../component/Settings/DeleteSettings'))
const ListUnapprovedMessages = lazy(() => import('../component/Message/ListUnapprovedMessages'))
const SMSManagement = lazy(() => import('../component/SMS/SMSManagement'))
const ListMessageFilters = lazy(() => import('../component/MessageFilter/ListMessageFilters'))
const AddMessageFilter = lazy(() => import('../component/MessageFilter/AddMessageFilter'))
const EditMessageFilter = lazy(() => import('../component/MessageFilter/EditMessageFilter'))
const ShowMessageFilter = lazy(() => import('../component/MessageFilter/ShowMessageFilter'))
const DeleteMessageFilter = lazy(() => import('../component/MessageFilter/DeleteMessageFilter'))
const CensoredWord = lazy(() => import('../component/MessageFilter/CensoredWord'))
const MailManagement = lazy(() => import('../component/Mail/MailManagement'))
const ListMailSendingHandlers = lazy(() => import('../component/Mail/MailSendingHandler/ListMailSendingHandlers'))
const AddMailSendingHandler = lazy(() => import('../component/Mail/MailSendingHandler/AddMailSendingHandler'))
const AddMailSendingTemplate = lazy(() => import('../component/Mail/MailSendingHandler/AddMailSendingTemplate'))
const AddMailSendingName = lazy(() => import('../component/Mail/MailSendingHandler/AddMailSendingName'))
const DeleteMailSendingHandler = lazy(() => import('../component/Mail/MailSendingHandler/DeleteMailSendingHandler'))
const AddNewMailTemplate = lazy(() => import('../component/Mail/MailSendingHandler/AddNewMailTemplate'))
const DataCellDetails = lazy(() => import('../layout/Table/DataCellDetails'))
const ListSMSSendingHandlers = lazy(() => import('../component/SMS/SMSSendingHandler/ListSMSSendingHandlers'))
const AddSMSSendingHandler = lazy(() => import('../component/SMS/SMSSendingHandler/AddSMSSendingHandler'))
const AddSMSSendingTemplate = lazy(() => import('../component/SMS/SMSSendingHandler/AddSMSSendingTemplate'))
const AddSMSSendingName = lazy(() => import('../component/SMS/SMSSendingHandler/AddSMSSendingName'))
const DeleteSMSSendingHandler = lazy(() => import('../component/SMS/SMSSendingHandler/DeleteSMSSendingHandler'))
const AddNewSMSTemplate = lazy(() => import('../component/SMS/SMSSendingHandler/AddNewSMSTemplate'))
const NotificationManagement = lazy(() => import('../component/Notification/NotificationManagement'))
const ListNotificationSendingHandlers = lazy(() => import('../component/Notification/NotificationSendingHandler/ListNotificationSendingHandlers'))
const AddNotificationSendingHandler = lazy(() => import('../component/Notification/NotificationSendingHandler/AddNotificationSendingHandler'))
const AddNotificationSendingTemplate = lazy(() => import('../component/Notification/NotificationSendingHandler/AddNotificationSendingTemplate'))
const AddNewNotificationTemplate = lazy(() => import('../component/Notification/NotificationSendingHandler/AddNewNotificationTemplate'))
const AddNotificationSendingName = lazy(() => import('../component/Notification/NotificationSendingHandler/AddNotificationSendingName'))
const DeleteNotificationSendingHandler = lazy(() => import('../component/Notification/NotificationSendingHandler/DeleteNotificationSendingHandler'))
const DeleteNotificationTemplate = lazy(() => import('../component/Notification/NotificationTemplate/DeleteNotificationTemplate'))
const DeleteSMSTemplate = lazy(() => import('../component/SMS/SMSTemplate/DeleteSMSTemplate'))
const ListUnreadNotifications = lazy(() => import('../component/Notification/ListUnreadNotifications'))
const ListUserNotifications = lazy(() => import('../component/Notification/ListUserNotifications'))







const componentMap = {

    "api":                                  () => <API/>,
    "home":                                 () => <Home/>,
    "top-nav":                              () => <TopNav/>,
    "add-smsc":                             () => <AddSMSC/>,
    "add-user":                             () => <AddUser/>,
    "add-role":                             () => <AddRole/>,
    "add-sales":                            () => <AddSales/>,
    "add-order":                            () => <AddOrder/>,
    "add-admin":                            () => <AddAdmin/>,
    "add-client":                           () => <AddClient/>,
    "add-ticket":                           () => <AddTicket/>,
    "list-smscs":                           () => <ListSMSCs/>,
    "list-roles":                           () => <ListRoles/>,
    "add-banner":                           () => <AddBanner/>,
    "list-sales":                           () => <ListSales/>,
    "add-sender":                           () => <AddSender/>,
    "add-folder":                           () => <AddFolder/>,
    "list-users":                           () => <ListUsers/>,
    "list-admins":                          () => <ListAdmins/>,
    "list-orders":                          () => <ListOrders/>,
    "add-country":                          () => <AddCountry/>,
    "add-message":                          () => <AddMessage/>,
    "upload-file":                          () => <UploadFile/>,
    "add-partner":                          () => <AddPartner/>,
    "client-files":                         () => <ClientFiles/>,
    "list-folders":                         () => <ListFolders/>,
    "list-clients":                         () => <ListClients/>,
    "list-senders":                         () => <ListSenders/>,
    "add-operator":                         () => <AddOperator/>,
    "list-tickets":                         () => <ListTickets/>,
    "add-settings":                         () => <AddSettings/>,
    "list-banners":                         () => <ListBanners/>,
    "list-partners":                        () => <ListPartners/>,
    "list-settings":                        () => <ListSettings/>,
    "list-messages":                        () => <ListMessages/>,
    "add-pricelist":                        () => <AddPricelist/>,
    "list-operators":                       () => <ListOperators/>,
    "list-countries":                       () => <ListCountries/>,
    "sms-management":                       () => <SMSManagement/>,
    "list-pricelist":                       () => <ListPricelist/>,
    "client-profile":                       () => <ClientProfile/>,
    "mail-management":                      () => <MailManagement/>,
    "add-smsc-binding":                     () => <AddSMSCBinding/>,
    "add-client-sender":                    () => <AddClientSender/>,
    "add-message-group":                    () => <AddMessageGroup/>,
    "text-file-example":                    () => <TextFileExample/>,
    "word-file-example":                    () => <WordFileExample/>,
    "list-permissions":                     () => <ListPermissions/>,
    "queue-management":                     () => <QueueManagement/>,
    "add-client-message":                   () => <AddClientMessage/>,
    "add-message-filter":                   () => <AddMessageFilter/>,
    "add-business-field":                   () => <AddBusinessField/>,
    "add-payment-method":                   () => <AddPaymentMethod/>,
    "list-smsc-bindings":                   () => <ListSMSCBindings/>,
    "excel-file-example":                   () => <ExcelFileExample/>,
    "list-client-senders":                  () => <ListClientSenders/>,
    "list-client-tickets":                  () => <ListClientTickets/>,
    "list-mail-templates":                  () => <ListMailTemplates/>,
    "list-message-groups":                  () => <ListMessageGroups/>,
    "list-message-filters":                 () => <ListMessageFilters/>,
    "list-business-fields":                 () => <ListBusinessFields/>,
    "list-payment-methods":                 () => <ListPaymentMethods/>,
    "add-message-language":                 () => <AddMessageLanguage/>,
    "list-client-messages":                 () => <ListClientMessages/>,
    "add-sender-connection":                () => <AddSenderConnection/>,
    "list-message-segments":                () => <ListMessageSegments/>,
    "list-message-languages":               () => <ListMessageLanguages/>,
    "add-sms-sending-handler":              () => <AddSMSSendingHandler/>,
    "client-file-management":                () => <ClientFileManagement/>,
    "add-client-message-group":             () => <AddClientMessageGroup/>,
    "list-message-recipients":              () => <ListMessageRecipients/>,
    "add-mail-sending-handler":             () => <AddMailSendingHandler/>,
    "list-scheduled-messages":              () => <ListScheduledMessages/>,
    "client-ticket-management":             () => <ClientTicketManagement/>,
    "list-unapproved-messages":             () => <ListUnapprovedMessages/>,
    "notification-management":              () => <NotificationManagement/>,
    "list-senders-connections":             () => <ListSendersConnections/>,
    "list-sms-sending-handlers":            () => <ListSMSSendingHandlers/>,
    "client-sender-management":             () => <ClientSenderManagement/>,
    "client-message-management":            () => <ClientMessageManagement/>,
    "list-mail-sending-handlers":           () => <ListMailSendingHandlers/>,
    "list-client-message-groups":           () => <ListClientMessageGroups/>,
    "add-message-group-recipient":          () => <AddMessageGroupRecipient/>,
    "list-message-group-recipients":        () => <ListMessageGroupRecipients/>,
    "list-client-sender-connections":       () => <ListClientSenderConnections/>,
    "list-client-message-recipients":       () => <ListClientMessageRecipients/>,
    "list-client-scheduled-messages":       () => <ListClientScheduledMessages/>,
    "add-sender-and-sender-connection":     () => <AddSenderAndSenderConnection/>,
    "list-client-unapproved-messages":      () => <ListClientUnapprovedMessages/>,
    "add-notification-sending-handler":     () => <AddNotificationSendingHandler/>,
    "list-notification-sending-handlers":   () => <ListNotificationSendingHandlers/>,
    "list-client-message-group-recipients": () => <ListClientMessageGroupRecipients/>,

    "show-job":                             (job) => <ShowJob job={job}/>,
    "edit-smsc":                            (smsc) => <EditSMSC smsc={smsc}/>,
    "show-smsc":                            (smsc) => <ShowSMSC smsc={smsc}/>,
    "edit-user":                            (user) => <EditUser user={user}/>,
    "show-role":                            (role) => <ShowRole role={role}/>,
    "edit-role":                            (role) => <EditRole role={role}/>,
    "show-user":                            (user) => <ShowUser user={user}/>,
    "show-file":                            (file) => <ShowFile file={file}/>,
    "show-failed-job":                      (job) => <ShowFailedJob job={job}/>,
    "list-jobs":                            (queue) => <ListJobs queue={queue}/>,
    "show-order":                           (order) => <ShowOrder order={order}/>,
    "edit-order":                           (order) => <EditOrder order={order}/>,
    "show-sales":                           (sales) => <ShowSales sales={sales}/>,
    "edit-sales":                           (sales) => <EditSales sales={sales}/>,
    "edit-admin":                           (admin) => <EditAdmin admin={admin}/>,
    "show-admin":                           (admin) => <ShowAdmin admin={admin}/>,
    "items-list":                           (items) => <ItemsList items={items}/>,
    "role-list":                            (userID) => <RoleList userID={userID}/>,
    "show-banner":                          (banner) => <ShowBanner banner={banner}/>,
    "edit-banner":                          (banner) => <EditBanner banner={banner}/>,
    "edit-sender":                          (sender) => <EditSender sender={sender}/>,
    "show-sender":                          (sender) => <ShowSender sender={sender}/>,
    "show-client":                          (client) => <ShowClient client={client}/>,
    "edit-client":                          (client) => <EditClient client={client}/>,
    "show-ticket":                          (ticket) => <ShowTicket ticket={ticket}/>,
    "edit-folder":                          (folder) => <EditFolder folder={folder}/>,
    "job-management":                       (queue) => <JobManagement queue={queue}/>,
    "list-failed-jobs":                     (queue) => <ListFailedJobs queue={queue}/>,
    "all-services":                         (services) => <Service services={services}/>,
    "get-folder-files":                     (folder) => <GetFolderFiles folder={folder}/>, 
    "show-message":                         (message) => <ShowMessage message={message}/>,
    "show-country":                         (country) => <ShowCountry country={country}/>,
    "edit-country":                         (country) => <EditCountry country={country}/>,
    "edit-partner":                         (partner) => <EditPartner partner={partner}/>,
    "show-partner":                         (partner) => <ShowPartner partner={partner}/>,
    "message-list":                         (messages) => <MessagesList messages={messages}/>,
    "edit-settings":                        (settings) => <EditSettings settings={settings}/>,
    "show-settings":                        (settings) => <ShowSettings settings={settings}/>,
    "show-operator":                        (operator) => <ShowOperator operator={operator}/>,
    "edit-operator":                        (operator) => <EditOperator operator={operator}/>,
    "service-contexts":                     (service) => <ServiceContexts service={service}/>,
    "upload-file-to-folder":                (folder) => <UploadFileToFolder folder={folder}/>,
    "profile":                              (user, role) => <Profile user={user} role={role}/>,
    "default":                              (componentKey) => <NotFound route={componentKey}/>,
    "show-client-message":                  (message) => <ShowClientMessage message={message}/>,
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
    "edit-ticket":                          (ticket, data) => <EditTicket ticket={ticket} data={data}/>,
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
    "update-user-attribute":                (attribute, updateAttribute) => <UpdateUserAttribute attribute={attribute} updateAttribute={updateAttribute}/>,
    "recipients-group-addition":            (userID, setGroupRecipients) => <RecipientsGroupAddition userID={userID} setGroupRecipients={setGroupRecipients}/>,
    "cancel-scheduled-message":             (messageID, onCancelMessageSchedule) => <CancelScheduledMessage messageID={messageID} onCancelMessageSchedule={onCancelMessageSchedule}/>,
    "invalid-recipients-modal":             (invalidRecipients, onContinue, onCancel) => <InvalidRecipientsModal invalidRecipients={invalidRecipients} onContinue={onContinue} onCancel={onCancel}/>,
    "list-unread-notifications":            (userID, expanded, countUnreadNotifications) => <ListUnreadNotifications userID={userID} expanded={expanded} countUnreadNotifications={countUnreadNotifications}/>,
    "add-message-segments":                 (sender, senderConnections, order, language, groupRecipients) => <AddMessageSegments sender={sender} senderConnections={senderConnections} order={order} language={language} groupRecipients={groupRecipients}/>,
    "add-client-message2":                  (sender, senderConnections, order, language, groupRecipients) => <AddClientMessage2 sender={sender} senderConnections={senderConnections} order={order} language={language} groupRecipients={groupRecipients}/>,


    "delete-file":                          (file, onDelete) => <DeleteFile file={file} onDelete={onDelete}/>,
    "delete-role":                          (role, onDelete) => <DeleteRole role={role} onDelete={onDelete}/>,
    "delete-smsc":                          (smsc, onDelete) => <DeleteSMSC smsc={smsc} onDelete={onDelete}/>,
    "delete-user":                          (user, onDelete) => <DeleteUser user={user} onDelete={onDelete}/>,
    "delete-admin":                         (admin, onDelete) => <DeleteAdmin admin={admin} onDelete={onDelete}/>,
    "delete-sales":                         (sales, onDelete) => <DeleteSales sales={sales} onDelete={onDelete}/>,
    "delete-client":                        (client, onDelete) => <DeleteClient client={client} onDelete={onDelete}/>,
    "delete-sender":                        (sender, onDelete) => <DeleteSender sender={sender} onDelete={onDelete}/>,
    "delete-folder":                        (folder, onDelete) => <DeleteFolder folder={folder} onDelete={onDelete}/>,
    "delete-ticket":                        (ticket, onDelete) => <DeleteTicket ticket={ticket} onDelete={onDelete}/>,
    "delete-banner":                        (banner, onDelete) => <DeleteBanner banner={banner} onDelete={onDelete}/>,
    "delete-country":                       (country, onDelete) => <DeleteCountry country={country} onDelete={onDelete}/>,
    "delete-message":                       (message, onDelete) => <DeleteMessage message={message} onDelete={onDelete}/>,
    "delete-partner":                        (partner, onDelete) => <DeletePartner partner={partner} onDelete={onDelete}/>,
    "delete-operator":                      (operator, onDelete) => <DeleteOperator operator={operator} onDelete={onDelete}/>,
    "delete-settings":                      (settings, onDelete) => <DeleteSettings settings={settings} onDelete={onDelete}/>,
    "delete-sms-template":                  (template, onDelete) => <DeleteSMSTemplate template={template} onDelete={onDelete}/>,
    "delete-pricelist":                     (pricelist, onDelete) => <DeletePricelist pricelist={pricelist} onDelete={onDelete}/>,
    "delete-mail-template":                 (template, onDelete) => <DeleteMailTemplate template={template} onDelete={onDelete}/>,
    "delete-permission":                    (permission, onDelete) => <DeletePermission permission={permission} onDelete={onDelete}/>,
    "delete-smsc-binding":                  (smscBinding, onDelete) => <DeleteSMSCBinding smscBinding={smscBinding} onDelete={onDelete}/>,
    "delete-notification-template":         (template, onDelete) => <DeleteNotificationTemplate template={template} onDelete={onDelete}/>,
    "delete-message-group":                 (messageGroup, onDelete) => <DeleteMessageGroup messageGroup={messageGroup} onDelete={onDelete}/>,
    "delete-message-filter":                (messageFilter, onDelete) => <DeleteMessageFilter messageFilter={messageFilter} onDelete={onDelete}/>,
    "delete-business-field":                (businessField, onDelete) => <DeleteBusinessField businessField={businessField} onDelete={onDelete}/>,
    "delete-payment-method":                (paymentMethod, onDelete) => <DeletePaymentMethod paymentMethod={paymentMethod} onDelete={onDelete}/>,
    "delete-message-language":              (messageLanguage, onDelete) => <DeleteMessageLanguage messageLanguage={messageLanguage} onDelete={onDelete}/>,
    "delete-sender-connection":             (senderConnection, onDelete) => <DeleteSenderConnection senderConnection={senderConnection} onDelete={onDelete}/>,
    "delete-sms-sending-handler":           (smsSendingHandler, onDelete) => <DeleteSMSSendingHandler smsSendingHandler={smsSendingHandler} onDelete={onDelete}/>,
    "delete-mail-sending-handler":          (mailSendingHandler, onDelete) => <DeleteMailSendingHandler mailSendingHandler={mailSendingHandler} onDelete={onDelete}/>,
    "delete-message-group-recipient":       (messageGroupRecipient, onDelete) => <DeleteMessageGroupRecipient messageGroupRecipient={messageGroupRecipient} onDelete={onDelete}/>,
    "delete-notification-sending-handler":  (notificationSendingHandler, onDelete) => <DeleteNotificationSendingHandler notificationSendingHandler={notificationSendingHandler} onDelete={onDelete}/>,


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