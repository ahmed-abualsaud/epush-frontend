import "../../assets/style/layout/messages-list.css"
import { isEmpty } from "../../utils/helper"

const MessagesList = ({ messages }) => {

    return (
        <div className="messages-list">
            {isEmpty(messages) ? 
            <div className="messages-list-item">
                <div className="messages-list-title">No Title</div>
                <div className="messages-list-content"><pre>The list does't have any messages yet</pre></div>
            </div> :
            messages?.map(message => 
                <div className="messages-list-item">
                    <div className="messages-list-title">{message?.title}</div>
                    <div className="messages-list-content"><pre>{message?.content}</pre></div>
                </div>
            )}
            <div className="messages-list-total">Total= {messages?.length}</div>
        </div>
    )
}

export default MessagesList