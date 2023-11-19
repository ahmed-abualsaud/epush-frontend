import { isEmpty } from "../../utils/helper"
import Input from "../../layout/Shared/Input"
import useCoreApi from "../../api/useCoreApi"
import { navigate } from "../../setup/navigator"
import { showAlert } from "../../utils/validator"
import { getElement } from "../../utils/dom"
import { useSelector } from "react-redux"
import Page from "../../page/Page"

const AddClientSender = () => {

    const { addSender } = useCoreApi()
    const user = useSelector(state => state.auth.user)


    const addNewSender = async () => {
        const sender = {
            name: getElement("add-sender-name")?.value,
            user_id: user?.user?.id + "",
            approved: false
        }

        if (isEmpty(sender)) {
            showAlert("Valid Sender Information Required")
            return
        }

        const result = await addSender(sender);
        if (! isEmpty(result)) {
            navigate("content", "list-client-messages")
            showAlert("Sender Added Successfully!")
        }
    }

    const senderNameOnInputHandler = (e) => {
        const englishRegex = /^[A-Za-z0-9\s!@#$%^&*()-_=+[\]{};:'"<>/?.,|`~]*$/;
        if (!englishRegex.test(e.currentTarget.value)) {
            e.currentTarget.value = e.currentTarget.value.substring(0, e.currentTarget.value.length - 1);
        }
    }



    return (
        <Page title="Add New Sender">
            <div className="m-4">Note: the maximum sender name length is 11 characters and it should be in english</div>
            <Input id="add-sender-name" type="text" icon="fas fa-pen" placeholder="Sender Name" validrules="required" maxLength={11} onInput={senderNameOnInputHandler}/>

            <div className="button-container">
                <button className="button" onClick={() => addNewSender()}>Add New Sender</button>
            </div>
        </Page>
    )
}

export default AddClientSender