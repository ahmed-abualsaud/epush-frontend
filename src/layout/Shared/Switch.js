import '../../assets/style/layout/switch.css'

const Switch = ({ id, labelLeft, labelRight, defaultChecked, onLeft, onRight }) => {

    const handleSwitch = (e) => {

        if (e.currentTarget.checked && onRight) {
            onRight()
        }
        if (! e.currentTarget.checked && onLeft) {
            onLeft()
        }
    }

    return (
        <div className="switch d-flex flex-column align-items-center pt-5">
            <h6><span>{labelLeft}</span><span>{labelRight}</span></h6>
            <input id={id} className="checkbox d-none" type="checkbox" defaultChecked={defaultChecked} onChange={handleSwitch}/>
            <label for={id}></label>
        </div>
    )
}

export default Switch