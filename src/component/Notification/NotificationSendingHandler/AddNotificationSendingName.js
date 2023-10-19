import useNotificationApi from "../../../api/useNotificationApi"
import Input from "../../../layout/Shared/Input"
import RadioButton from "../../../layout/Shared/RadioButton"
import { navigate } from "../../../setup/navigator"
import { getElement } from "../../../utils/dom"
import { isEmpty } from "../../../utils/helper"
import { showAlert } from "../../../utils/validator"

const AddNotificationSendingName = ({ template, handler }) => {

    const { addNotificationSendingHandler } = useNotificationApi()

    const addNewNotification = async () => {
        const result = await addNotificationSendingHandler({
            name: getElement("add-notification-name").value,
            user_id: getElement("add-notification-user_id")?.value,
            handler_id: handler.id,
            notification_template_id: template.id
        })

        if (! isEmpty(result)) {
            navigate("content", "notification-management")
            showAlert("Notification Added Successfully!")
        } else {
            showAlert("Valid Notification Information Required")
        }
    }

    const displayUserIDInput = () => {
        getElement("add-notification-user_id").style.display = "block"
        getElement("add-notification-user_id-icon").style.display = "block"
    }

    const hideUserIDInput = () => {
        getElement("add-notification-user_id").style.display = "none"
        getElement("add-notification-user_id-icon").style.display = "none"
    }

    return (
        <div className="component-container">
            <h1 className="content-header mb-5">Finally, Add The Notification Name</h1>

            <Input id="add-notification-name" type="text" placeholder="Notification Name" validrules="required">
                <i className="input-icon fas fa-pen"></i>
            </Input>

            <div className="my-5">
                <div className="d-flex align-items-center">
                    <i style={{fontSize: "25px"}} class="fa-brands fa-first-order-alt"></i>
                    <div style={{fontSize: "35px", display: "inline-block", marginLeft: "10px"}}> Choose how the user id is entered!</div>
                </div>
                <div className="mt-3">
                    <RadioButton group="add-notification" value="Automaticly Detected" onCheck={hideUserIDInput} checked={true}/>
                    <RadioButton group="add-notification" value="Enter User ID" onCheck={displayUserIDInput}/>
                </div>
            </div>

            <Input id="add-notification-user_id" type="number" placeholder="User ID" style={{display: "none"}}>
                <i id="add-notification-user_id-icon" style={{display: "none"}} className="input-icon fas fa-pen"></i>
            </Input>

            <div className="button-container">
                <button className="button" onClick={() => addNewNotification()}>Add New Notification</button>
            </div>
        </div>
    )
}

export default AddNotificationSendingName