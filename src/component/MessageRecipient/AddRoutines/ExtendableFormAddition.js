import { useState } from "react"
import ItemsList from "../../../layout/List/ItemsList"

const ExtendableFormAddition = ({ setRecipients }) => {

    const [numbers, setNumbers] = useState([])
    const [recipientNumbers, setrecipientNumbers] = useState([
        { id: 0, value: '' }
    ])

    const handleFocus = (id) => {
        if (id === recipientNumbers.length - 1) {
            setrecipientNumbers([...recipientNumbers, { id: id + 1, value: '' }])
        }
    }

    const handleChange = (id, event) => {
        const newrecipientNumbers = [...recipientNumbers]
        newrecipientNumbers[id].value = event.target.value
        setrecipientNumbers(newrecipientNumbers)
        let nums = [...new Set(newrecipientNumbers.map(num => (num.value)).filter(num => num && num))]
        setNumbers(nums)
        setRecipients(nums)
    }

    return (
        <div style={{marginTop: "120px"}}>
            <div className="d-flex">
                <div style={{width: "60%", marginTop: "10px"}}>
                    {recipientNumbers.map(input => (
                        <div key={input.id} className="my-2">
                            <i style={{position: "absolute", marginTop: "13px", fontSize: "25px", marginLeft: "20px"}} className="fas fa-mobile-retro"></i>
                            <input 
                                id={ "recipient-number-input-" + input.id } 
                                type="number" 
                                name="recipient-number" 
                                className="form-style"
                                placeholder="Recipient Number" 
                                autoComplete="off" 
                                onFocus={() => handleFocus(input.id)}
                                onChange={(event) => handleChange(input.id, event)}
                                value={input.value}
                            />
                        </div>
                    ))}
                </div>
                <div style={{width: "40%"}}>
                    <ItemsList items={numbers}/>
                </div>
            </div>
        </div>
    )
}

export default ExtendableFormAddition