import useMailApi from "../../../api/useMailApi"
import Input from "../../../layout/Shared/Input"
import RadioButton from "../../../layout/Shared/RadioButton"
import { navigate } from "../../../setup/navigator"
import { getElement } from "../../../utils/dom"
import { isEmpty } from "../../../utils/helper"
import { showAlert } from "../../../utils/validator"

const AddMailSendingName = ({ template, handler }) => {

    const { addMailSendingHandler } = useMailApi()

    const addNewMail = async () => {
        const result = await addMailSendingHandler({
            name: getElement("add-mail-name").value,
            email: getElement("add-mail-email")?.value,
            handler_id: handler.id,
            mail_template_id: template.id
        })
        if (! isEmpty(result)) {
            navigate("content", "mail-management")
            showAlert("Mail Added Successfully!")
        } else {
            showAlert("Valid Mail Information Required")
        }
    }

    const displayEmailInput = () => {
        getElement("add-mail-email").style.display = "block"
        getElement("add-mail-email-icon").style.display = "block"
    }

    const hideEmailInput = () => {
        getElement("add-mail-email").style.display = "none"
        getElement("add-mail-email-icon").style.display = "none"
    }

    return (
        <div>
            <h1 style={{marginTop: "-25px"}} className="content-header mb-5">Finally, Add The Mail Name</h1>

            <Input id="add-mail-name" type="text" icon="fas fa-pen" placeholder="Mail Name" validrules="required"/>

            <div className="my-5 mx-2">
                <div className="d-flex align-items-center">
                    <i style={{fontSize: "25px"}} class="fa-brands fa-first-order-alt"></i>
                    <div style={{fontSize: "35px", display: "inline-block", marginLeft: "10px"}}> Choose how the email is entered!</div>
                </div>
                <div className="mt-3">
                    <RadioButton group="add-mail" value="Automaticly Detected" onCheck={hideEmailInput} checked={true}/>
                    <RadioButton group="add-mail" value="Enter Email" onCheck={displayEmailInput}/>
                </div>
            </div>

            <Input id="add-mail-email" type="text" placeholder="Mail Address" style={{display: "none"}}>
                <i id="add-mail-email-icon" style={{display: "none"}} className="input-icon fas fa-pen"></i>
            </Input>

            <div className="button-container">
                <button className="button" onClick={() => addNewMail()}>Add New Mail</button>
            </div>
        </div>
    )
}

export default AddMailSendingName