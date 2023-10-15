import React, { useEffect, useRef, useState } from "react";
import "../../assets/style/layout/notification.css";
import { render } from "../../setup/navigator";
import NavBar from "../Navigation/NavBar";
import useAxiosApi from "../../api/Api";

const Notification = () => {
  const draggableRef = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });

  const [expanded, setExpanded] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(0);

  const { getAuthenticatedUser } = useAxiosApi()
  const [authUser, setAuthUser] = useState(getAuthenticatedUser());


  const setupLock = useRef(true)
  const setup = async () => {
    render("user-notification", "list-unread-notifications", authUser?.user?.id ?? 0, true, getNotificationsCount)
  }
  useEffect(() => {
      if (setupLock.current) { setupLock.current = false; setup() }
  }, [])

  useEffect(() => {
    const dragElement = (elmnt) => {
      let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

      const dragMouseDown = (e) => {
        e = e || window.event;
        e.preventDefault();
        pointer.current = { x: e.clientX, y: e.clientY };
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
      };

      const elementDrag = (e) => {
        e = e || window.event;
        e.preventDefault();
        e.target.style.cursor = "move"
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = elmnt.offsetTop - pos2 + "px";
        elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
      };

      const closeDragElement = (e) => {
        document.onmouseup = null;
        document.onmousemove = null;
        e.target.style.cursor = "pointer"
      };

      if (elmnt) {
        elmnt.onmousedown = dragMouseDown;
      }
    };

    dragElement(draggableRef.current);

    const channel = window.echo.channel(`notification.user.${authUser?.user?.id ?? '0'}`);
    channel.notification((notification) => {
      render("user-notification", "list-unread-notifications", authUser?.user?.id ?? 0, true, getNotificationsCount)
    })

    return () => {
      channel.stopListening(`notification.user.${authUser?.user?.id ?? '0'}`);
    };
  }, []);

  const expandNotification = (e) => {

    const { x, y } = pointer.current;
    if (
      Math.abs(e.clientX - x) === 0 &&
      Math.abs(e.clientY - y) === 0
    ) {
      setExpanded((prevState) => {
        render("user-notification", "list-unread-notifications", authUser?.user?.id ?? 0, ! prevState, getNotificationsCount)
        return ! prevState
      });
    }
  }

  const getNotificationsCount = (notificationsCount) => {
    setNotificationsCount(notificationsCount)
  }

  const renderAllUserNotifications = () => {
    render("user-notification", "list-user-notifications", authUser?.user?.id ?? 0)
  }

  const renderUnreadUserNotifications = () => {
    render("user-notification", "list-unread-notifications", authUser?.user?.id ?? 0, expanded, getNotificationsCount)
  }

  return (
    <div
      className={`notification-container ${expanded ? "notification-expand" : ""}`}
      ref={draggableRef}
    >
      <div className="notification">
        <div className="notification-icon" onClick={expandNotification}>
          <div className={`notification-count ${expanded ? 'd-none' : 'd-block'}`}>{notificationsCount}</div>
          <div className={`${(! expanded && notificationsCount > 0) ? 'notification-not-empty' : ''}`}>{expanded ? <i className="fas fa-xmark"></i> : <i className="fas fa-bell"></i>}</div>
        </div>
        <div className={`notification-content ${expanded ? "d-block" : "d-none"}`}>
          <NavBar>
            <div onClick={renderAllUserNotifications}><i className="fas fa-bell"></i>All Notifications</div>
            <div onClick={renderUnreadUserNotifications}><i className="fas fa-eye-slash"></i>Unread Notifications</div>
          </NavBar>

          <div id="user-notification"></div>
        </div>
      </div>
    </div>
  );
};

export default Notification;