import { getElement } from "../../utils/dom"
import { beautifulToKebabCase, snakeToBeautifulCase } from "../../utils/helper"
import '../../assets/style/layout/droplist.css'
import { useEffect, useState } from "react"
const DropList = ({ selectName, options, onSelect }) => {

    const [currentOptions, setCurrentOptions] = useState([])

    useEffect(() => {
        setCurrentOptions(options)
    }, [options])

    const displayOptionsOnClickHandler = (e) => {
        e.stopPropagation()
        e.currentTarget.querySelector('i')?.classList.toggle('rotate-180')
        getElement('select-option-' + beautifulToKebabCase(selectName)).classList.toggle('selectbox--active')
    }

    const selectOptionOnClickHandler = (e) => {
        e.stopPropagation()
        let label = e.currentTarget.querySelector('.option__label')
        let selectbox = getElement('select-option-' + beautifulToKebabCase(selectName))
        getElement('display-options-' + beautifulToKebabCase(selectName)).innerHTML = label.innerHTML
        let option = label.getAttribute('data-value')
        selectbox.setAttribute('data-option', option)
        selectbox.classList.remove('selectbox--active', 'selectbox--unselect')
        onSelect(option)
    }

    const searchDroplistOptions = (e) => {
        setCurrentOptions(options.filter(option => option?.toLowerCase().includes(e.currentTarget.value)))
    }

    return (
        <div className="droplist-container">
            <div id={"select-option-" + beautifulToKebabCase(selectName)} className="selectbox selectbox--unselect" data-option="">
                <div id={"display-options-" + beautifulToKebabCase(selectName)} className="selectbox__displayWord" onClick={displayOptionsOnClickHandler}>
                    {selectName} <i className="ms-1 uil uil-angle-double-down"></i>
                </div>
                <div className="option-container">
                    <div className="form-group droplist-search-options">
                        <input style={{padding: "10px"}} className="form-style" onInput={searchDroplistOptions} type="text" placeholder="Type Option Name"/>
                    </div>
                    {currentOptions.map((option, index) => (
                        <div className="option-container__option" onClick={selectOptionOnClickHandler} key={index}>
                            <input type="radio" className="option__radio" name="category" />
                            <label className="option__label" data-value={option}>
                                {option}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DropList