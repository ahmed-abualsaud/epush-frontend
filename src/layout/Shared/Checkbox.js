import '../../assets/style/layout/checkbox.css'

const Checkbox = () => {

    return (
        <label class="checkbox-container">
            <input type="checkbox"/>
            <div class="checkmark"></div>
            <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg" class="celebrate">
                <polygon points="0,0 10,10"></polygon>
                <polygon points="0,25 10,25"></polygon>
                <polygon points="0,50 10,40"></polygon>
                <polygon points="50,0 40,10"></polygon>
                <polygon points="50,25 40,25"></polygon>
                <polygon points="50,50 40,40"></polygon>
            </svg>
        </label>
    )
}

export default Checkbox