import '../../assets/style/component/service-contexts.css'

import Switch from '../../layout/Shared/Switch'
import { isEmpty } from "../../utils/helper"
import useOrchiApi from "../../api/useOrchiApi"
import { render } from '../../setup/navigator'
import { showAlert } from '../../utils/validator'
import { useEffect, useRef, useState } from "react"
import { getElement, updateElement } from "../../utils/dom"
import Page from '../../page/Page'


const ServiceContexts = ({ service }) => {

    const [ contexts, setContexts ] = useState([])
    const [ contextsHandleGroups, setContextsHandleGroups ] = useState([])
    const { getServiceContexts, getContextHandleGroups, updateContext } = useOrchiApi()

    const setupLock = useRef(true)
    const setup = async () => {
        const ctx = await getServiceContexts(service.id)
        if (ctx) setContexts(ctx)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const enableDisableContext = async (contextID, enabled) => {
        if (! isEmpty(await updateContext(contextID, { enabled: enabled }))) {
            showAlert(enabled ? "Context Enabled Successfully" : "Context Disabled Successfully")
        } else {
            getElement(contextID + "-context-switch").checked = false
        }
    }

    const getContextHandleGroupState = (contextID) => {
        return contextsHandleGroups.filter(
            contextsHandleGroups => contextsHandleGroups.contextID === contextID
        )[0]
    }
    
    const showHandleGroups = async (contextID, contextListID) => {
        let hdlgrp = []
        const ctxHdlGrps = getContextHandleGroupState(contextID)
        let ctxHdlGrpsIsEmpty = isEmpty(ctxHdlGrps)

        if (ctxHdlGrpsIsEmpty) {
            hdlgrp = await getContextHandleGroups(contextID)
            setContextsHandleGroups([...contextsHandleGroups, { contextID: contextID, handleGroups: hdlgrp }])
        }

        const contextHandleGroupsList = getElement(contextListID)
        contextHandleGroupsList.innerHTML = ""
        contextHandleGroupsList.classList.toggle("expand-card-item-list")
        if (contextHandleGroupsList.classList.contains("expand-card-item-list")) {
            updateElement([
                <span>Hide Handle Groups</span>,
                <i class="uil uil-angle-up"></i>
            ], contextID + "-show-handle-groups-button")
            contextHandleGroupsList.style.border = "1px solid #fff"
        } else {
            updateElement([
                    <span>Show Handle Groups</span>,
                    <i class="uil uil-angle-down"></i>
            ], contextID + "-show-handle-groups-button")
            contextHandleGroupsList.style.border = ""
        }

        const ctxHdlGrpList = ctxHdlGrpsIsEmpty ? hdlgrp : ctxHdlGrps.handleGroups
        isEmpty(ctxHdlGrpList)? render(contextListID, "no-contexts") : render(contextListID, "handle-group", ctxHdlGrpList)

    }


//=========================================================================================================================================================


    return (
        <Page title={service.name.charAt(0).toUpperCase() + service.name.slice(1) + " Contexts"}>
            { ! isEmpty(contexts) &&
            <div className="cards-list">
                {contexts.map((context) => (
                    <div id={context.name + "-edit-user-card-item"} className="card-item">
                        <div id={context.name + "-head"} className="card-item-head">
                            <div>Context ID</div>
                            <div>Context Name</div>
                            <div>Online</div>
                            <div>Enabled</div>
                        </div>
                        <div className="card-item-body">
                            <div>{ context.id }</div>
                            <div>{ context.name }</div>
                            <div>{ context.online ? "Yes" : "No" }</div>
                            <td>
                                <Switch 
                                    id={context.id + "-context-switch"} 
                                    labelLeft="Disabled" 
                                    labelRight="Enabled" 
                                    defaultChecked={context.enabled}
                                    onLeft={() => enableDisableContext(context.id, false)}
                                    onRight={() => enableDisableContext(context.id, true)}
                                />
                            </td>

                        </div>
                        <div id={context.id + "-show-handle-groups-button"} className="expand-card-item" onClick={() => showHandleGroups(context.id, context.name + "-contexts-list")}>
                            <span>Show Handle Groups</span>
                            <i className="uil uil-angle-down"></i>
                        </div>
                        <ul id={context.name + "-contexts-list"} className="card-item-subitems"></ul>
                    </div>                            
                ))}
            </div>}
        </Page>
    )
}

export default ServiceContexts