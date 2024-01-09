import { useState } from "react"
import ItemsList from "../../../layout/List/ItemsList"
import { randomString } from "../../../utils/strUtils"
import ExtendedInput from "../../../layout/Shared/ExtendedInput"

const ExtendableFormAddition = ({ setGroupRecipients }) => {

    const [numbers, setNumbers] = useState([])
    const [messageGroupName, setMessageGroupName] = useState("group-" + randomString(8))

    const handleChange = (numbers) => {
        setNumbers(numbers)
        setGroupRecipients([{name: messageGroupName, recipients: numbers.map(num => {return {number: num}})}])
    }

    return (
        <div className="d-flex align-items-center">
            <div style={{width: "60%", marginTop: "10px"}}>
                <div style={{margin: "0 10px"}}>You can enter new number by pressing TAB button</div>
                <div>
                    <ExtendedInput 
                        type="number" 
                        icon="fas fa-mobile-retro" 
                        placeholder="Recipient Number" 
                        setUpdatedValues={handleChange} 
                    />
                </div>
            </div>
            <div style={{width: "40%"}}>
                <ItemsList items={numbers}/>
            </div>
        </div>
    )
}

export default ExtendableFormAddition