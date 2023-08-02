import Switch from "../layout/Switch"
import { isEmpty } from "../utils/helper"
import { getElement } from "../utils/dom"
import useOrchiApi from "../api/useOrchiApi"
import { navigate } from "../setup/navigator"
import { showAlert } from "../utils/validator"

const HandleGroup = ({ handleGroups }) => {

    const { updateHandleGroup } = useOrchiApi()

    const enableDisableHandleGroup = async (handleGroupID, enabled) => {
        if (! isEmpty(await updateHandleGroup(handleGroupID, { enabled: enabled }))) {
            showAlert(enabled ? "Handle Group Enabled Successfully" : "Handle Group Disabled Successfully")
        } else {
            getElement(handleGroupID + "-handle-group-switch").checked = false
        }
    }

    return (
        <table className="fl-table">
            <thead>
                <tr>
                    <th>Handle Group ID</th>
                    <th>Handle Group Name</th>
                    <th>Handle Group Description</th>
                    <th>Enabled</th>
                </tr>
            </thead>
            <tbody>
                {Object.values(handleGroups).map((handleGroup) => (
                    <tr>
                        <td className="clickable-row" onClick={() => navigate("content", "handler", handleGroup)}>{handleGroup.id}</td>
                        <td className="clickable-row" onClick={() => navigate("content", "handler", handleGroup)}>{handleGroup.name}</td>
                        <td className="clickable-row" onClick={() => navigate("content", "handler", handleGroup)}>{handleGroup.description}</td>
                        <td>
                            <Switch 
                                id={handleGroup.id + "-handle-group-switch"} 
                                labelLeft="Disabled"
                                labelRight="Enabled" 
                                defaultChecked={handleGroup.enabled}
                                onLeft={() => enableDisableHandleGroup(handleGroup.id, false)}
                                onRight={() => enableDisableHandleGroup(handleGroup.id, true)}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default HandleGroup