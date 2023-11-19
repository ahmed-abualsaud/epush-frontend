import { createPortal } from "react-dom"
import "../../assets/style/layout/simple-modal.css"

const SimpleModal = ({ id, className, show, render, onClose }) => {

    const closeModal = () => {
        onClose && onClose()
    }
  
    return createPortal(
        <div
            id={id}
            className={`simple-modal-container ${className}`}
            style={{
                opacity: `${show ? "1" : "0"}`,
                visibility: `${show ? "visible" : "hidden"}`,
            }}
        >
            <div className="simple-modal-inner">
                <div className="simple-modal-content">
                    {render && render()}
                </div>
                <button className="simple-modal-close" onClick={closeModal}>
                    X
                </button>
            </div>
        </div>
    , document.body)
}

export default SimpleModal