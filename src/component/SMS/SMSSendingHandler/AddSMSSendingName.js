import useSMSApi from "../../../api/useSMSApi"
import Input from "../../../layout/Shared/Input"
import RadioButton from "../../../layout/Shared/RadioButton"
import { navigate } from "../../../setup/navigator"
import { getElement } from "../../../utils/dom"
import { isEmpty } from "../../../utils/helper"
import { showAlert } from "../../../utils/validator"

const AddSMSSendingName = ({ template, handler }) => {

    const { addSMSSendingHandler } = useSMSApi()

    const addNewSMS = async () => {
        const result = await addSMSSendingHandler({
            name: getElement("add-sms-name").value,
            phone: getElement("add-sms-phone")?.value,
            handler_id: handler.id,
            sms_template_id: template.id
        })

        if (! isEmpty(result)) {
            navigate("content", "sms-management")
            showAlert("SMS Added Successfully!")
        } else {
            showAlert("Valid SMS Information Required")
        }
    }

    const displayPhoneInput = () => {
        getElement("add-sms-phone").style.display = "block"
        getElement("add-sms-phone-icon").style.display = "block"
    }

    const hidePhoneInput = () => {
        getElement("add-sms-phone").style.display = "none"
        getElement("add-sms-phone-icon").style.display = "none"
    }

    return (
        <div className="component-container">
            <h1 className="content-header mb-5">Finally, Add The SMS Name</h1>

            <Input id="add-sms-name" type="text" placeholder="SMS Name" validrules="required">
                <i className="input-icon fas fa-pen"></i>
            </Input>

            <div className="my-5">
                <div className="d-flex align-items-center">
                    <i style={{fontSize: "25px"}} class="fa-brands fa-first-order-alt"></i>
                    <div style={{fontSize: "35px", display: "inline-block", marginLeft: "10px"}}> Choose how the phone is entered!</div>
                </div>
                <div className="mt-3">
                    <RadioButton group="add-sms" value="Automaticly Detected" onCheck={hidePhoneInput} checked={true}/>
                    <RadioButton group="add-sms" value="Enter Phone" onCheck={displayPhoneInput}/>
                </div>
            </div>

            <Input id="add-sms-phone" type="number" placeholder="Phone Number" style={{display: "none"}}>
                <i id="add-sms-phone-icon" style={{display: "none"}} className="input-icon fas fa-pen"></i>
            </Input>

            <div className="button-container">
                <button className="button" onClick={() => addNewSMS()}>Add New SMS</button>
            </div>
        </div>
    )
}

export default AddSMSSendingName