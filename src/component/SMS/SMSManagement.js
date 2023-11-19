import { useEffect, useRef } from "react"
import NavBar from "../../layout/Navigation/NavBar"
import { render } from "../../setup/navigator"
import Page from "../../page/Page"

const SMSManagement = () => {

    const setupLock = useRef(true)
    const setup = async () => {
        render("sms-management", "list-sms-sending-handlers")
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const renderSendingSMS = () => {
        render("sms-management", "list-sms-sending-handlers")
    }

    const renderFilterSMS = () => {
        render("sms-management", "list-message-filters")
    }

    return (
        <Page className="m-0">
            <NavBar>
                <div onClick={renderSendingSMS}><i className="fas fa-sms"></i>Sending SMS</div>
                <div onClick={renderFilterSMS}><i className="fas fa-filter"></i>Filter SMS</div>
            </NavBar>

            <div style={{marginTop: "25px"}} id="sms-management"></div>

        </Page>
    )
}

export default SMSManagement