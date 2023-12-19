import { useEffect, useRef, useState } from "react"
import NavBar from "../../layout/Navigation/NavBar"
import { render } from "../../setup/navigator"
import Page from "../../page/Page"
import Switch from "../../layout/Shared/Switch"
import { showAlert } from "../../utils/validator"
import useQueueApi from "../../api/useQueueApi"

const JobManagement = ({ queue }) => {

    const [queueEnabled, setQueueEnabled] = useState(false);

    const { checkQueueEnabled, enableDisableQueue } = useQueueApi()

    const setupLock = useRef(true)
    const setup = async () => {
        setQueueEnabled(await checkQueueEnabled(queue))
        render("job-management", "list-jobs", queue)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const renderListJobs = async () => {
        setQueueEnabled(await checkQueueEnabled(queue))
        render("job-management", "list-jobs", queue)
    }

    const renderListFailedJobs = async () => {
        setQueueEnabled(await checkQueueEnabled(queue))
        render("job-management", "list-failed-jobs", queue)
    }

    const enableDisableAQueue = async (value) => {
        showAlert(await enableDisableQueue(queue, value))
    }

    return (
        <Page>
            <div style={{
                position:"absolute",
                marginTop: "-3px", 
                right: "0", 
                color: "white", 
                zIndex: "1000"
            }}>
                <Switch
                    key={queueEnabled}
                    id={"queue-switch"} 
                    labelLeft="Disable Queue" 
                    labelRight="Enable Queue" 
                    defaultChecked={queueEnabled}
                    onLeft={() => enableDisableAQueue(false)}
                    onRight={() => enableDisableAQueue(true)}
                />
            </div>

            <NavBar>
                <div onClick={renderListJobs}><i class="fas fa-bars"></i>Jobs</div>
                <div onClick={renderListFailedJobs}><i className="fas fa-triangle-exclamation"></i>Failed Jobs</div>
            </NavBar>

            <div id="job-management"></div>

        </Page>
    )
}

export default JobManagement