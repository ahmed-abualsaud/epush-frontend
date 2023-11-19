import '../../assets/style/component/handler.css'

import { useEffect, useRef, useState } from "react"
import useOrchiApi from "../../api/useOrchiApi"
import { isEmpty } from "../../utils/helper"
import Switch from '../../layout/Shared/Switch'
import { showAlert } from '../../utils/validator'
import { getElement } from '../../utils/dom'
import Page from '../../page/Page'

const Handler = ({ handleGroup }) => {

    const [ handlers, setHandlers ] = useState([])
    const { getHandleGroupHandlers, updateHandler } = useOrchiApi()

    const setupLock = useRef(true)
    const setup = async () => {
        const hdlgrp = await getHandleGroupHandlers(handleGroup.id)
        if (hdlgrp) setHandlers(hdlgrp)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const enableDisableHandler = async (handlerID, enabled) => {
        if (! isEmpty(await updateHandler(handlerID, { enabled: enabled }))) {
            showAlert(enabled ? "Handler Enabled Successfully" : "Handler Disabled Successfully")
        } else {
            getElement(handlerID + "-handler-switch").checked = false
        }
    }

    return (
        <Page title={handleGroup.name.charAt(0).toUpperCase() + handleGroup.name.slice(1) + " Handlers"}>
            <table className="fl-table card-table">
                <thead>
                    <tr>
                        <th>Handler ID</th>
                        <th>Handler Name</th>
                        <th>Handler Description</th>
                        <th>Handler Endpoint</th>
                        <th>Enabled</th>
                    </tr>
                </thead> 
                <tbody>
                {! isEmpty(handlers) &&
                handlers.map((handler) => (
                        
                    <tr>
                        <td>{ handler.id }</td>
                        <td>{ handler.name }</td>
                        <td>{ handler.description }</td>
                        <td className="td-break">{ handler.endpoint }</td>
                        <td>
                            <Switch 
                                id={handler.id + "-handler-switch"} 
                                labelLeft="Disabled" 
                                labelRight="Enabled" 
                                defaultChecked={handler.enabled}
                                onLeft={() => enableDisableHandler(handler.id, false)}
                                onRight={() => enableDisableHandler(handler.id, true )}
                            />
                        </td>
                    </tr>
                                                        
                ))}
                    <tr>
                        <td className="last-row" colSpan={5}></td>
                    </tr>
                </tbody>
            </table>    
        </Page>
    )
}

export default Handler