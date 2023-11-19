import { isEmpty } from "../../utils/helper"
import useCoreApi from "../../api/useCoreApi"
import { navigate } from "../../setup/navigator"
import { showAlert } from "../../utils/validator"
import DropList from "../../layout/Shared/DropList"
import { useEffect, useRef, useState } from "react"
import { getElement } from "../../utils/dom"
import Page from "../../page/Page"


const EditSMSCBinding = ({ smscBinding }) => {

    const { updateSMSCBinding, listCountries, listOperators, listSMSCs } = useCoreApi()

    const [smscs, setSMSCs] = useState([])
    const [countries, setCountries] = useState([])
    const [operators, setOperators] = useState([])
    const [selectedSMSCID, setSelectedSMSCID] = useState(smscBinding.smsc_id)
    const [selectedCountryID, setSelectedCountryID] = useState(smscBinding.country_id)
    const [selectedOperatorID, setSelectedOperatorID] = useState(smscBinding.operator_id)

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

    const updateNewSMSCBinding = async () => {

        const binding = {
            smsc_id: selectedSMSCID + "",
            country_id: selectedCountryID + "",
            operator_id: selectedOperatorID + "",
            default: getElement("edit-smsc-binding-default")?.checked
        }

        const result = await updateSMSCBinding(smscBinding.id, binding);
        if (! isEmpty(result)) {
            showAlert("SMSC Binding Updated Successfully!")
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
        <Page title="Update New SMSC Binding">
            <div className="mx-4">
                <div className="d-inline-flex align-items-center" style={{width: "20%", fontSize: "40px"}}>Country: </div>
                <div className="d-inline-flex justify-content-center mt-5" style={{width: "55%"}}>
                    <DropList selectName={countries.filter(ct => ct.id === smscBinding.country.id)[0]?.name} options={countries.map(item => item.name)} onSelect={onSelectCountry}/>
                </div>
                <div className="d-inline-flex align-items-center p-5" style={{width: "25%", fontSize: "25px"}}>
                    Code = {isEmpty(selectedCountryID) ? countries.filter(c => c.id === smscBinding.country.id)[0]?.code : countries.filter(c => c.id === selectedCountryID)[0]?.code}
                </div>
            </div>

            <div className="mx-4">
                <div className="d-inline-flex align-items-center" style={{width: "20%", fontSize: "40px"}}>Operator: </div>
                <div className="d-inline-flex justify-content-center mt-5" style={{width: "55%"}}>
                    <DropList selectName={operators.filter(o => o.id === smscBinding.operator.id)[0]?.name} options={operators.map(item => item.name)} onSelect={onSelectOperator}/>
                </div>
                <div className="d-inline-flex align-items-center p-5" style={{width: "25%", fontSize: "25px"}}>
                    Code = {isEmpty(selectedOperatorID) ? operators.filter(o => o.id === smscBinding.operator.id)[0]?.code : operators.filter(o => o.id === selectedOperatorID)[0]?.code}
                </div>
            </div>

            <div className="mx-4">
                <div className="d-inline-flex align-items-center" style={{width: "20%", fontSize: "40px"}}>SMSC: </div>
                <div className="d-inline-flex justify-content-center mt-5" style={{width: "55%"}}>
                    <DropList selectName={smscs.filter(s => s.id === smscBinding.smsc.id)[0]?.name} options={smscs.map(item => item.name)} onSelect={onSelectSMSC}/>
                </div>
                <div className="d-inline-flex align-items-center p-5" style={{width: "25%", fontSize: "25px"}}>
                    Value = {isEmpty(selectedSMSCID) ? smscs.filter(s => s.id === smscBinding.smsc.id)[0]?.value : smscs.filter(s => s.id === selectedSMSCID)[0]?.value}
                </div>
            </div>

            <div className="d-flex flex-column align-items-center pt-5">
                <h6><span>Not Default</span><span>Is Default</span></h6>
                <input id="edit-smsc-binding-default" className="checkbox d-none" type="checkbox" defaultChecked={smscBinding.default}/>
                <label for="edit-smsc-binding-default"></label>
            </div>

            <div className="button-container">
                <button className="button" onClick={() => updateNewSMSCBinding()}>Update SMSC Binding</button>
            </div>
        </Page>
    )
}

export default EditSMSCBinding