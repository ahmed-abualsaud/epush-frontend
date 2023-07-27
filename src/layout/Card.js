import useOrchiApi from '../api/useOrchiApi'
import '../assets/style/layout/card.css'
import ServiceContexts from '../component/ServiceContexts'
import { getElement, render } from '../utils/dom'
import { isEmpty } from '../utils/helper'
import { showAlert } from '../utils/validator'
import Switch from './Switch'

const Card = ({ service, title, identifier, description, icon }) => {

    const { updateService } = useOrchiApi()

    const enableDisableService = async (serviceID, enabled) => {
        if (! isEmpty(await updateService(serviceID, { enabled: enabled }))) {
            showAlert(enabled ? "Service Enabled Successfully" : "Service Disabled Successfully")
        } else {
            getElement(serviceID + "-app-service-switch").checked = false
        }
    }

    return (
        <div className="card-layout">
            <div className="card-imge">
                <div className="card-icon"><i className={icon}></i></div>
                <div className="card-title-id">
                    <p className="card-title">{ title }</p>
                    <p className="card-unique-id">{ identifier }</p>
                </div>
            </div>

            <div className="description">{ description }</div>

            <div className="card-footer">
                <div className="card-footer-inner">
                    <a href="#" onClick={() => render(<ServiceContexts service={service}/>, "content")}>
                        <span className="card-show"><i className="uil uil-eye"></i>Show</span>
                    </a>
                    <div className="d-inline-block">
                        <Switch 
                            id={service.id + "-app-service-switch"} 
                            labelLeft="Disabled"
                            labelRight="Enabled" 
                            defaultChecked={service.enabled}
                            onLeft={() => enableDisableService(service.id, false)}
                            onRight={() => enableDisableService(service.id, true)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card