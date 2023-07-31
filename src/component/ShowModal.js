import { isEmpty } from '../utils/helper'
import useCoreApi from '../api/useCoreApi'
import '../assets/style/component/show-modal.css'
import { useEffect, useRef, useState } from 'react'

const ShowModal = ({ entity, data, columns }) => {

    const { getClient } = useCoreApi()
    const [currentClient, setCurrentClient] = useState([])

    const setupLock = useRef(true)
    const setup = async () => {

        if (entity === "User" && isEmpty(currentClient)) {
            let client = await getClient(data.id)
            if (client) setCurrentClient(client)
        }
    }

    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])


    return (
        <div className="show-modal-wrapper">
            {entity === "User" && <div className="w-50 show-modal-avatar">
                <img src={entity === "User" && ! isEmpty(data["avatar"])? data["avatar"] : "https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg"} alt="Avatar" />
            </div>}
            <div className={"show-modal-info-wrapper " + (entity === "User"? "w-50": "w-100")}>
                { ! isEmpty(currentClient?.company_name) && 
                    <div className="show-modal-info">
                        <span className="show-modal-info-column">Company Name: </span>
                        <span>{currentClient.company_name}</span>
                    </div>
                }
                { ! isEmpty(currentClient?.religion) && 
                    <div className="show-modal-info">
                        <span className="show-modal-info-column">Religion: </span>
                        <span>{currentClient.religion}</span>
                    </div>
                }
                { ! isEmpty(currentClient?.notes) && 
                    <div className="show-modal-info">
                        <span className="show-modal-info-column">Notes: </span>
                        <span>{currentClient.notes}</span>
                    </div>
                }                
                { ! isEmpty(currentClient?.websites) && 
                    <div className="websites-container">
                        <hr></hr>
                        <span className="show-modal-info-column">Websites</span>

                        {currentClient?.websites.map((website) => (
                            <div className="show-modal-info">
                                <li>
                                    { website.url }
                                </li>
                            </div>
                        ))}
                    </div>
                }
                { isEmpty(currentClient?.company_name) && isEmpty(currentClient?.religion) && isEmpty(currentClient?.websites) && columns.map((col) => (
                    <div className="show-modal-info">
                        <span className="show-modal-info-column">{col}: </span>
                        <span key={ "show-" + col }>{ typeof data[col] === 'boolean' ? data[col] ? "Yes": "No" : data[col] }</span>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default ShowModal