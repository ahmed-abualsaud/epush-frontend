import Page from "../../page/Page"
import { useSelector } from "react-redux"
import Section from "../../layout/Shared/Section"
import { showAlert } from "../../utils/validator"
import { useEffect, useRef, useState } from "react"
import MutedInput from "../../layout/Shared/MutedInput"
import ExtendedInput from "../../layout/Shared/ExtendedInput"
import { isEmpty, snakeToBeautifulCase } from "../../utils/helper"
import useCoreApi from "../../api/useCoreApi"
import { generateApiKey, isIPAddress } from "../../utils/strUtils"


const API = () => {

    const [client, setClient] = useState([])
    const [apiKey, setApiKey] = useState("")
    const [ipAddresses, setIPAddresses] = useState([])

    const {getClient, updateClient} = useCoreApi()

    const user = useSelector(state => state.auth.user)

    const setupLock = useRef(true)
    const setup = async () => {
        if (! isEmpty(user?.user?.id)) {
            let clt = await getClient(user?.user?.id)
            if (clt) setClient(clt)

            if (! clt?.use_api_key) {
                setApiKey("You are not allowed to use any API key")
            } else if (isEmpty(clt?.api_key)) {
                setApiKey("You don't have API key, you can get a new one by clicking the button below")
            } else {
                setApiKey(clt?.api_key)
            }
        }
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    useEffect(() => {
        setClient(user)
    }, [user])

    const updateUserAttribute = async (attributeName, attributeValue, onSuccess = null) => {
        if (! isEmpty(attributeValue)) {
            let data = new FormData()
            data.append(attributeName, attributeValue)
            data = await updateClient(user?.user?.id, data)

            if (! isEmpty(data)) {
                setup()
                showAlert(`Client ${snakeToBeautifulCase(attributeName)} Updated Successfully`)
                onSuccess && onSuccess(data)
            }
        } else {
            showAlert(`Please Enter ${snakeToBeautifulCase(attributeName)} First`)
        }
    }

    const generateApiToken = async () => {
        if (client?.use_api_key) {
            updateUserAttribute("api_key", await generateApiKey(user?.user?.id))
        } else {
            showAlert("You are not allowed to use any API key")
        }
        
    }

    const updateAccessIPAddress = async () => {
        let invalidIPs = ipAddresses.filter(ip => ! isIPAddress(ip))

        if (! isEmpty(invalidIPs)) {
            showAlert("Invalid IP addresses: " + invalidIPs[0]);
            return
        }

        if (client?.use_api_key) {
            updateUserAttribute("ip_address", [...new Set(ipAddresses)].join("-"))
        } else {
            showAlert("You are not allowed to use IP restriction")
        }
    }

    return (
        <Page>
            <Section title="API Token">
                <Section contentPadding="0 0 20px 0">
                    <div style={{fontSize: "30px", margin: "20px"}}>API Token Generation</div>
                    <MutedInput id="api-key" value={apiKey}/>
                    <div className="w-100 d-flex justify-content-center">
                        <button className="button" onClick={() => generateApiToken()}>Generate API Token</button>
                    </div>
                </Section>
                {client?.use_api_key && <Section contentPadding="0 0 20px 0">
                    <div style={{fontSize: "30px", margin: "20px"}}>API Token Restriction</div>
                    <ExtendedInput 
                        type="text" 
                        icon="fas fa-laptop" 
                        placeholder="Access IP Address" 
                        setUpdatedValues={(IPs) => setIPAddresses(IPs)} 
                        values={client?.ip_address?.split("-")}
                    />
                    <div className="w-100 d-flex justify-content-center">
                        <button className="button" onClick={() => updateAccessIPAddress()}>Apply IP Address Restriction</button>
                    </div>
                </Section>}
            </Section>
        </Page>
    )
}

export default API