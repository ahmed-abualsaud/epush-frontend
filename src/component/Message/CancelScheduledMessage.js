import useCoreApi from "../../api/useCoreApi";
import { isEmpty } from "../../utils/helper";
import { showAlert } from "../../utils/validator";

const CancelScheduledMessage = ({ messageID, onCancelMessageSchedule }) => {

    const { updateMessage } = useCoreApi()

    const cancelScheduledMessage = async () => {

        let msg = await updateMessage(messageID, {scheduled_at: null})

        if (isEmpty(msg)) {
            showAlert("Message Unscheduling Failed")
            return
        }

        onCancelMessageSchedule && onCancelMessageSchedule()
        showAlert("Message Unscheduled Successfully")
    }

    return (
        <div>
            <h1 className="popup-header">Cancel Message Schedule</h1>
            <p className="popup-content">Do you want to cancel the message schedule?</p>
            <div className="popup-button-wrapper">
                <a href="#"><button className="button delete-button" onClick={() => cancelScheduledMessage()}>Cancel</button></a>
            </div>
        </div>
    )
}

export default CancelScheduledMessage