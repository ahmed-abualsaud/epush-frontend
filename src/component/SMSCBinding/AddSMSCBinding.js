import { isEmpty } from "../../utils/helper"
import useCoreApi from "../../api/useCoreApi"
import { navigate } from "../../setup/navigator"
import { showAlert } from "../../utils/validator"
import DropList from "../../layout/Shared/DropList"
import { useEffect, useRef, useState } from "react"
import { getElement } from "../../utils/dom"
import Page from "../../page/Page"
import Input from "../../layout/Shared/Input"


const AddSMSCBinding = () => {

    const { addSMSCBinding, listCountries, listOperators, listSMSCs } = useCoreApi()

    const [smscs, setSMSCs] = useState([])
    const [countries, setCountries] = useState([])
    const [operators, setOperators] = useState([])
    const [selectedSMSCID, setSelectedSMSCID] = useState(null)
    const [selectedCountryID, setSelectedCountryID] = useState(null)
    const [selectedOperatorID, setSelectedOperatorID] = useState(null)

    const setupLock = useRef(true)
    const setup = async () => {
        const ctr = await listCountries(1000000000000)
        if (ctr) setCountries(ctr.data)

        const opr = await listOperators(1000000000000)
        if (opr) setOperators(opr.data)

        const smscs = await listSMSCs(1000000000000)
        if (smscs) setSMSCs(smscs.data)
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const addNewSMSCBinding = async () => {

        const smscBinding = {
            smsc_id: selectedSMSCID + "",
            country_id: selectedCountryID + "",
            operator_id: selectedOperatorID + "",
            default: getElement("add-smsc-binding-default")?.checked,
            length: getElement("add-smsc-length")?.value ?? 8
        }

        if (isEmpty(smscBinding)) {
            showAlert("Valid SMSC Binding Information Required")
            return
        }

        const result = await addSMSCBinding(smscBinding);
        if (! isEmpty(result)) {
            navigate("content", "list-smsc-bindings")
            showAlert("SMSC Binding Added Successfully!")
        }
    }

    const onSelectCountry = (option) => {
        setSelectedCountryID(countries.filter(ct => ct.name === option)[0].id)
    }

    const onSelectOperator = (option) => {
        setSelectedOperatorID(operators.filter(op => op.name === option)[0].id)
    }

    const onSelectSMSC = (option) => {
        setSelectedSMSCID(smscs.filter(sc => sc.name === option)[0].id)
    }



    return (
        <Page title="Add New SMSC Binding">
            <div className="mx-4">
                <div className="d-inline-flex align-items-center" style={{width: "20%", fontSize: "40px"}}>Country: </div>
                <div className="d-inline-flex justify-content-center mt-5" style={{width: "55%"}}>
                    <DropList selectName="Select Country" options={countries.map(item => item.name)} onSelect={onSelectCountry}/>
                </div>
                <div className="d-inline-flex align-items-center p-5" style={{width: "25%", fontSize: "25px"}}>
                    Code = {countries.filter(c => c.id === selectedCountryID)[0]?.code ?? "Unknown"}
                </div>
            </div>

            <div className="mx-4">
                <div className="d-inline-flex align-items-center" style={{width: "20%", fontSize: "40px"}}>Operator: </div>
                <div className="d-inline-flex justify-content-center mt-5" style={{width: "55%"}}>
                    <DropList selectName="Select Operator" options={operators.map(item => item.name)} onSelect={onSelectOperator}/>
                </div>
                <div className="d-inline-flex align-items-center p-5" style={{width: "25%", fontSize: "25px"}}>
                    Code = {operators.filter(o => o.id === selectedOperatorID)[0]?.code ?? "Unknown"}
                </div>
            </div>

            <div className="mx-4">
                <div className="d-inline-flex align-items-center" style={{width: "20%", fontSize: "40px"}}>SMSC: </div>
                <div className="d-inline-flex justify-content-center mt-5" style={{width: "55%"}}>
                    <DropList selectName="Select SMSC" options={smscs.map(item => item.name)} onSelect={onSelectSMSC}/>
                </div>
                <div className="d-inline-flex align-items-center p-5" style={{width: "25%", fontSize: "25px"}}>
                    Value = {smscs.filter(s => s.id === selectedSMSCID)[0]?.value ?? "Unknown"}
                </div>
            </div>

            <div className="mx-4">
                <Input id="add-smsc-length" type="number" icon="fas fa-plug" placeholder="Number Length" validrules="required"/>
            </div>

            <div className="d-flex flex-column align-items-center pt-5">
                <h6><span>Not Default</span><span>Is Default</span></h6>
                <input id="add-smsc-binding-default" className="checkbox d-none" type="checkbox" defaultChecked={false}/>
                <label for="add-smsc-binding-default"></label>
            </div>

            <div className="button-container">
                <button className="button" onClick={() => addNewSMSCBinding()}>Add New SMSC Binding</button>
            </div>
        </Page>
    )
}

export default AddSMSCBinding