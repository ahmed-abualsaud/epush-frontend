import { useEffect, useRef, useState } from "react"
import { isEmpty } from "../../utils/helper"
import useNotificationApi from "../../api/useNotificationApi"

const ListUnreadNotifications = ({ userID, expanded, countUnreadNotifications }) => {

    const { getUserUnreadNotifications, updateUserNotifications } = useNotificationApi()
    const [unreadNotifications, setUnreadNotifications] = useState([])

    const setupLock = useRef(true)
    const setup = async () => {
        
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            if (expanded) {
                const unrdnotfs = await getUserUnreadNotifications(userID);      
                countUnreadNotifications(unrdnotfs?.length);
                if (unrdnotfs) setUnreadNotifications(unrdnotfs);
            } else {
                updateUserNotifications(userID, { read: true })
                countUnreadNotifications(0);
                setUnreadNotifications([])
            }
        }
      
        fetchData();
      }, [expanded]);
    
    return (
        <div className="notifications-list">
            {isEmpty(unreadNotifications) ? 
            <div className="notification-empty">
                <span>Good, You read all the notifications</span>
                <i className="fas fa-cake-candles ms-2"></i>
            </div> :
             unreadNotifications?.map(unreadNotification => 
                <div className="notification-item">
                    <div className="notification-subject" dangerouslySetInnerHTML={{__html: unreadNotification.subject}}></div>
                    <div className="notification-content" dangerouslySetInnerHTML={{__html: unreadNotification.content}}></div>
                </div>
            )}
        </div>
    )
}

export default ListUnreadNotifications