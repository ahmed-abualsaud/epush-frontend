import { useEffect, useRef } from 'react'
import '../assets/style/layout/search.css'
import { getElement } from '../utils/dom'
import { snakeToBeautifulCase } from '../utils/helper'

const Search = ({ columns, searchColumn }) => {
  const setupLock = useRef(true)

  const setup = async () => {
    window.addEventListener('click', () => {
      getElement('select-column')?.classList.remove('selectbox--active')
    })
  }

  useEffect(() => {
    if (setupLock.current) {
      setupLock.current = false
      setup()
    }
  }, [])

  const displayColumnsOnClickHandler = (e) => {
    e.stopPropagation()
    e.target.querySelector('i')?.classList.toggle('rotate-180')
    getElement('select-column').classList.toggle('selectbox--active')
  }

  const selectColumnOnClickHandler = (e) => {
    e.stopPropagation()
    let label = e.currentTarget.querySelector('.option__label')
    let selectbox = getElement('select-column')
    getElement('display-columns').innerHTML = label.innerHTML
    let column = label.getAttribute('data-value')
    selectbox.setAttribute('data-option', column)
    selectbox.classList.remove('selectbox--active', 'selectbox--unselect')
    let searchInput = getElement("search-input-id")
    if (column === "phone") {
        searchInput.type = "number"
    }
    else if (column.includes("_at")) {
        searchInput.type = "date"
    } 
    else {
        searchInput.type = "text"
    }
  }

  const searchButtonOnClickHandler = (e) => {
    e.stopPropagation()
    let selectbox = getElement('select-column')
    if (selectbox.classList.contains('selectbox--unselect')) {
      selectbox.classList.add('selectbox--shake')
      setTimeout(() => {
        selectbox.classList.remove('selectbox--shake')
      }, 300)
    } else {
      searchColumn(selectbox.getAttribute('data-option'), getElement("search-input-id").value)
    }
  }

  return (
    <div className="search-container">
      <div id="select-column" className="selectbox selectbox--unselect" data-option="">
        <div id="display-columns" className="selectbox__displayWord" onClick={displayColumnsOnClickHandler}>
          Select Column <i className="ms-1 uil uil-angle-double-down"></i>
        </div>
        <div className="option-container">
          {columns.map((column, index) => (
            <div className="option-container__option" onClick={selectColumnOnClickHandler} key={index}>
              <input type="radio" className="option__radio" name="category" />
              <label className="option__label" data-value={column}>
                {snakeToBeautifulCase(column)}
              </label>
            </div>
          ))}
        </div>
      </div>
      <input id="search-input-id" className="search-input" type="text" name="search" placeholder="Type Keyword" />
      <a className="search-button" onClick={searchButtonOnClickHandler}>
        <i className="uil uil-search"></i>
      </a>
    </div>
  )
}

export default Search