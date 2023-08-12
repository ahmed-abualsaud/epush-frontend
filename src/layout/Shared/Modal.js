import '../../assets/style/layout/modal.css'
const Modal = () => {
    
    return (
        <div>
            <div className="popup" id="popup">
                <div className="popup-inner">
                    <div id="modal-content" className="popup-text">

                    </div>
                    <a className="popup-close" href="#">X</a>
                </div>
            </div>
        </div>
    )
}

export default Modal
