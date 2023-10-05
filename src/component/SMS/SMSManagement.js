import { useEffect, useRef } from "react"
import NavBar from "../../layout/Navigation/NavBar"
import { render } from "../../setup/navigator"

const SMSManagement = () => {

    const setupLock = useRef(true)
    const setup = async () => {
        render("sms-management", "sending-sms")
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const renderSendingSMS = () => {
        render("sms-management", "sending-sms")
    }

    const renderFilterSMS = () => {
        render("sms-management", "list-message-filters")
    }

    return (
        <div className="add-user-container">
            <NavBar>
                <div onClick={renderSendingSMS}><i className="fas fa-diagram-next"></i>Sending SMS</div>
                <div onClick={renderFilterSMS}><i className="far fa-rectangle-list"></i>Filter SMS</div>
            </NavBar>

            <div style={{marginTop: "25px"}} id="sms-management"></div>

        </div>
    )
}

export default SMSManagement