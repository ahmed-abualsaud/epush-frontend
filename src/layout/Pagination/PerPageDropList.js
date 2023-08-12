import '../../assets/style/component/per-page-drop-list.css'
import { getElement } from '../../utils/dom'

const PerPageDropList = ({ perPageHandler }) => {

  const handleOnMouseLeave = () => {
    getElement("dropdown-page").checked = false
  }

    return (
        <>
            <div className="dropdown-page">
                <input className="page-input" type="checkbox" id="dropdown-page" />

                <label className="dropdown-page__face" for="dropdown-page">
                    <div className="dropdown-page__text">Per Page</div>
                    <div className="dropdown-page__arrow"></div>
                </label>

                <ul className="dropdown-page__items" onMouseLeave={ handleOnMouseLeave }>
                    <li onClick={() => perPageHandler(10)}>10</li>
                    <li onClick={() => perPageHandler(25)}>25</li>
                    <li onClick={() => perPageHandler(50)}>50</li>
                    <li onClick={() => perPageHandler(100)}>100</li>
                </ul>
            </div>

            <svg>
                <filter id="goo">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                    <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                    <feBlend in="SourceGraphic" in2="goo" />
                </filter>
            </svg>
        </>
    )
}

export default PerPageDropList