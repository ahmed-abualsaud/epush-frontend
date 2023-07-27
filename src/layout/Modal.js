import '../assets/style/layout/modal.css'
import { render } from '../utils/dom'
const Modal = () => {
    
    return (
        <div>
            <div class="popup" id="popup">
                <div class="popup-inner">
                    <div id="modal-content" class="popup__text">

                    </div>
                    <a class="popup__close" href="#">X</a>
                </div>
            </div>
        </div>
    )
}

export default Modal
