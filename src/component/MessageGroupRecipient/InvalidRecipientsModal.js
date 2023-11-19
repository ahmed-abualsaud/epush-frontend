import ItemsList from "../../layout/List/ItemsList"
import { getElement } from "../../utils/dom"

const InvalidRecipientsModal = ({ invalidRecipients, onContinue, onCancel }) => {

    const handleOnContinue = () => {
        onContinue && onContinue()
        getElement("stay-in-current-page").click()
    }

    const handleOnCancel = () => {
        onCancel && onCancel()
        getElement("stay-in-current-page").click()
    }

    return (
        <div>
            <a id="stay-in-current-page" className="d-none" href="#"></a>
            <div style={{fontSize: "30px", margin: "20px"}}>You have invalid numbers, Do you want to continue?!</div>
            <div className="d-flex justify-content-center">
                <button className="button" onClick={handleOnContinue}>Continue</button>
                <button className="button" onClick={handleOnCancel}>Cancel</button>
            </div>
            <ItemsList items={invalidRecipients.map(ir => ir.number)}/>
        </div>
    )
}

export default InvalidRecipientsModal