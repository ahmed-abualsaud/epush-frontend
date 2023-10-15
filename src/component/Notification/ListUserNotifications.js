import { isEmpty } from "../../utils/helper"
import { useEffect, useRef, useState } from "react"
import useNotificationApi from "../../api/useNotificationApi"

const ListUserNotifications = ({ userID }) => {

    const { getUserNotifications } = useNotificationApi()
    const [notifications, setNotifications] = useState([])

    const setupLock = useRef(true)
    const setup = async () => {
        const notfs = await getUserNotifications(userID)
        if (notfs) setNotifications(notfs)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])
    
    return (
        <div className="notifications-list">
            {isEmpty(notifications) ? 
            <div style={{textAlign: "center"}} className="notification-empty">You don't have any notifications yet!</div> 
            : 
            notifications?.map(notification => 
                <div className="notification-item">
                    <div className="notification-subject" dangerouslySetInnerHTML={{__html: notification.subject}}></div>
                    <div className="notification-content" dangerouslySetInnerHTML={{__html: notification.content}}></div>
                </div>
            )}
        </div>
    )
}

export default ListUserNotifications