import { getElement } from "../../utils/dom"
import { beautifulToSnakeCase, snakeToBeautifulCase } from "../../utils/helper"

const UpdateUserAttribute = ({attribute, updateAttribute}) => {
    return (
        <div>
            <h1 className="popup-header">Update {snakeToBeautifulCase(attribute.attributeName)}</h1>
            <div className="w-100 d-flex justify-content-center">
                <input className="modal-input" type="text" id="attribute-value"/>
            </div>
            <div className="popup-button-wrapper mt-4">
                <a href="#"><button style={{transform: "scale(1.3)"}} className="button" onClick={() => updateAttribute(beautifulToSnakeCase(attribute.attributeName), getElement("attribute-value").value)}>Update</button></a>
            </div>
        </div>
    )
}

export default UpdateUserAttribute