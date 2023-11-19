import '../../assets/style/layout/radio.css'
import { randomString } from '../../utils/strUtils'

const RadioButton = ({ value, checked, group, onCheck }) => {

    const handleOnChange = (e) => {
        if (e.currentTarget.checked) {
            onCheck && onCheck(e.currentTarget)
        }
    }

    const componentKey = randomString(8)
    return (
        <div className="radio-container-wrapper">
            <label className="radio-container">
                <input id={value + "-" + componentKey} type="radio" defaultChecked={checked} value={value} name={group ?? componentKey} onChange={handleOnChange}/>
                <div className="checkmark"></div>
                <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg" className="celebrate">
                    <polygon points="0,0 10,10"></polygon>
                    <polygon points="0,25 10,25"></polygon>
                    <polygon points="0,50 10,40"></polygon>
                    <polygon points="50,0 40,10"></polygon>
                    <polygon points="50,25 40,25"></polygon>
                    <polygon points="50,50 40,40"></polygon>
                </svg>
            </label>
            <label className="radio-label" for={value + "-" + componentKey}>{value}</label>
        </div>
    )
}

export default RadioButton