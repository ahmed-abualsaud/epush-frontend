import { getElement } from "../../utils/dom"
import { isEmpty } from "../../utils/helper"
import '../../assets/style/layout/simple-droplist.css'
import { useEffect, useState } from "react"
import { randomString } from "../../utils/strUtils"
const SimpleDropList = ({ selectName, options, onSelect }) => {

    const componentKey = randomString(8)
    const [currentOptions, setCurrentOptions] = useState([])

    useEffect(() => {
        setCurrentOptions(options)
    }, [options])

    const displayOptionsOnClickHandler = (e) => {
        e.stopPropagation()
        e.currentTarget.querySelector('i')?.classList.toggle('rotate-180')
        getElement('select-option-' + componentKey).classList.toggle('selectbox--active')
    }

    const selectOptionOnClickHandler = (e) => {
        e.stopPropagation()
        let label = e.currentTarget.querySelector('.option-label')
        let selectbox = getElement('select-option-' + componentKey)
        let option = label.getAttribute('data-value')
        getElement('display-options-' + componentKey).innerHTML = isEmpty(option) ? selectName : label.innerHTML + '<i class="ms-1 uil uil-angle-double-down"></i>'
        selectbox.setAttribute('data-option', option)
        selectbox.classList.remove('selectbox--active', 'selectbox--unselect')
        onSelect && onSelect(option)
    }

    return (
        <div className="simple-droplist-container">
            <div id={"select-option-" + componentKey} className="selectbox selectbox--unselect" data-option="">
                <div id={"display-options-" + componentKey} className="selectbox-displayWord" onClick={displayOptionsOnClickHandler}>
                    {selectName} <i className="ms-1 uil uil-angle-double-down"></i>
                </div>
                <div className="option-container">
                    {currentOptions.map((option, index) => (
                        <div className="option-container-option" onClick={selectOptionOnClickHandler} key={index}>
                            <input type="radio" className="option-radio" name="category" />
                            <label className="option-label" data-value={option}>
                                {option}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SimpleDropList