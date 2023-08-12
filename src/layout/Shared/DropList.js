import { getElement } from "../../utils/dom"
import { beautifulToKebabCase, snakeToBeautifulCase } from "../../utils/helper"
import '../../assets/style/layout/droplist.css'
const DropList = ({ selectName, options, onSelect }) => {

    const displayOptionsOnClickHandler = (e) => {
        e.stopPropagation()
        e.target.querySelector('i')?.classList.toggle('rotate-180')
        getElement('select-column-' + beautifulToKebabCase(selectName)).classList.toggle('selectbox--active')
    }

    const selectOptionOnClickHandler = (e) => {
        e.stopPropagation()
        let label = e.currentTarget.querySelector('.option__label')
        let selectbox = getElement('select-column-' + beautifulToKebabCase(selectName))
        let option = label.getAttribute('data-value')
        getElement('display-columns-' + beautifulToKebabCase(selectName)).innerHTML = label.innerHTML
        selectbox.setAttribute('data-option', option)
        selectbox.classList.remove('selectbox--active', 'selectbox--unselect')
        onSelect(option)
    }

    return (
        <div className="droplist-container">
            <div id={"select-column-" + beautifulToKebabCase(selectName)} className="selectbox selectbox--unselect" data-option="">
                <div id={"display-columns-" + beautifulToKebabCase(selectName)} className="selectbox__displayWord" onClick={displayOptionsOnClickHandler}>
                {selectName} <i className="ms-1 uil uil-angle-double-down"></i>
                </div>
                <div className="option-container">
                {options.map((option, index) => (
                    <div className="option-container__option" onClick={selectOptionOnClickHandler} key={index}>
                        <input type="radio" className="option__radio" name="category" />
                        <label className="option__label" data-value={option}>
                            {snakeToBeautifulCase(option)}
                        </label>
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}

export default DropList