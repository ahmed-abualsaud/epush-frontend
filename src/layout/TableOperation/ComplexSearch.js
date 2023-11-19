import { useState } from "react"
import "../../assets/style/layout/complex-search.css"
import { getElement } from "../../utils/dom"
import { isEmpty, snakeToBeautifulCase } from "../../utils/helper"
import DropList from "../Shared/DropList"
import SimpleModal from "../Shared/Simplemodal"
import { showAlert } from "../../utils/validator"
import Switch from "../Shared/Switch"
import { randomString } from "../../utils/strUtils"

const ComplexSearch = ({ columns, onSearch }) => {

    const componentKey = randomString(8)
    const aggregators = [
        "",
        "AND",
        "OR",
        // "Nested"
    ]

    const operators = [
        "",
        "Equals", 
        "Less Than", 
        "Greater Than",
        "Less Than or Equals",
        "Greater Than or Equals",
        "Not Equals",
        "Between",
        "Not Between",
        "Like",
        "Not Like",
        "Fuzzy Like",
        "IN (...)",
        "Not IN (...)",
        "IS Empty",
        "IS Not Empty",
    ]

    const getAggregatorValue = (aggregator) => {

        switch (aggregator) {
            case "OR":                      return "OR"
            case "AND":                     return "AND"
            // case "Nested":                  return "(?)"
            default:                        return ""
        }
    }

    const getOperatorValue = (operator) => {

        switch (operator) {
            case "Equals":                  return "= ?"
            case "Less Than":               return "< ?"
            case "Greater Than":            return "> ?"
            case "Less Than or Equals":     return "<= ?"
            case "Greater Than or Equals":  return ">= ?"
            case "Not Equals":              return "!= ?"
            case "Between":                 return "BETWEEN ? AND ?"
            case "Not Between":             return "NOT BETWEEN ? AND ?"
            case "Like":                    return "LIKE ?"
            case "Not Like":                return "NOT LIKE ?"
            case "Fuzzy Like":              return "LIKE %?%"
            case "IN (...)":                return "IN (?)"
            case "Not IN (...)":            return "NOT IN (?)"
            case "IS Empty":                return "IS NULL"
            case "IS Not Empty":            return "IS NOT NULL"
            default:                        return ""
        }
    }


    const [visibility, setVisibility] = useState(false)
    const [currentColumn, setCurrentColumn] = useState("")
    const [currentOperator, setCurrentOperator] = useState("")
    const [queryParameters, setQueryParameters] = useState(columns.map(column => ({column: column})))


    const createOrUpdateQueryParameter = (column, data) => {
        setQueryParameters(queryParameters => {
            return queryParameters.findIndex(qp => qp.column === column) !== -1 ?
                queryParameters.map(qp => qp.column === column ? {...qp, data: {...qp.data, ...data}} : qp) :
                [...queryParameters, {column: column, data: data}]
        })
    }

    const getColumnDataType = (column) => {

        if (column === "phone") {
            return "number"
        }
        else if (column.includes("_date")) {
            return "date"
        }
        else if (column.includes("_at")) {
            return "datetime-local"
        }
        else {
            return "text"
        }
    }

    const onSelectOperator = (operator, column) => {
        if (["Between", "Not Between", "IN (...)", "Not IN (...)"].includes(operator)) {
            setVisibility(true)
        }
        setCurrentColumn(column)
        setCurrentOperator(operator)
        createOrUpdateQueryParameter(column, { operator: getOperatorValue(operator) })
    }

    const onSelectAggregator = (aggregator, column) => {
        createOrUpdateQueryParameter(column, { aggregator: getAggregatorValue(aggregator) })
    }

    const onEnteringRange = (min, max) => {
        let currentInput = getElement(currentColumn + "-input-" + componentKey)
        currentInput.type = "text"
        currentInput.value = min + "," + max
        createOrUpdateQueryParameter(currentColumn, { value: currentInput.value })

    }

    const onEnteringList = (list) => {
        let currentInput = getElement(currentColumn + "-input-" + componentKey)
        currentInput.type = "text"
        currentInput.value = list.join(',')
        createOrUpdateQueryParameter(currentColumn, { value: currentInput.value })
    }

    const handleValueChange = (column) => {
        let currentInput = getElement(column + "-input-" + componentKey)
        isEmpty(currentInput.value) && (currentInput.type = getColumnDataType(column))
        createOrUpdateQueryParameter(column, { value: currentInput.value })
    }

    const complexSearchRender = () => {
        if (["Between", "Not Between"].includes(currentOperator)) {
            return (
                <RangeSearch 
                    operator={currentOperator} 
                    dataType={getColumnDataType(currentColumn)} 
                    onGo={onEnteringRange} 
                    onCancel={onCloseModal}
                />
            )
        }

        if (["IN (...)", "Not IN (...)"].includes(currentOperator)) {
            return (
                <ListSearch 
                    operator={currentOperator} 
                    dataType={getColumnDataType(currentColumn)} 
                    onGo={onEnteringList} 
                    onCancel={onCloseModal}
                />
            )
        }
    }

    const onCloseModal = () => {
        setVisibility(false)
    }

    const startSearch = async () => {
        if (validateQueryParameters()) {
            onSearch && onSearch(buildCriteria())
        }
    }

    const buildCriteria = () => {
        return queryParameters.filter(qp => ! isEmpty(qp.data)).map(qp => {
                let castedvalues = castQueryParameters(qp.data.value)
                let parsedQuery = parseQuery(qp.data.operator, ["IN (?)", "NOT IN (?)"].includes(qp.data.operator) ? [castedvalues.join(',')] : castedvalues)
                return qp.column + " " + parsedQuery + " " + (isEmpty(qp.data.aggregator) ? "" : qp.data.aggregator)
            }).join(" ")
    }

    const parseQuery = (operator, parameters) => {
        if (["IS NULL", "IS NOT NULL"].includes(operator)) {
            return operator
        }

        let currentIndex = 0;
        let regex = (operator === "LIKE %?%") ? /%\?%/g  : /\?/g
        return operator.replace(regex, () => {
            const parameter = (operator === "LIKE %?%") ? `'%${parameters[currentIndex].replace(/'/g, "")}%'` : parameters[currentIndex];
            currentIndex++;
            return parameter;
        });
    }

    const castQueryParameters = (value) => {
        if (isEmpty(value)) {
            return []
        }

        let parameters = value.split(',')
        let result = []
      
        for (let i = 0; i < parameters.length; i++) {
            let parameter = parameters[i];
            const type = typeof parameter
        
            if (type === 'int') {
                result.push(parseInt(parameter))
            }

            if (type === 'float') {
                result.push(parseFloat(parameter))
            }

            if (type === 'double') {
                result.push(Number(parameter))
            }

            if (type === 'bool') {
                result.push(Boolean(parameter))
            }

            if (['true', 'yes'].includes(parameter.toLowerCase())) {
                result.push('true')
            }

            if (['false', 'no'].includes(parameter.toLowerCase())) {
                result.push('false')
            }

            if (type === 'string') {
                result.push(`'${parameter}'`)
            }
        }
        return result
    }

    const validateQueryParameters = () => {
        let emptySearchAggregators = []

        if (isEmpty(queryParameters.map(qp => qp.data))) {
            showAlert("Please enter search parameters")
            return false
        }

        for (let i = 0; i < queryParameters.length; i++) {
            let queryParameter = queryParameters[i];

            if (isEmpty(queryParameter.data)) {
                continue
            }

            if (isEmpty(queryParameter.column) && !isEmpty(queryParameter.data)) {
                showAlert("Search column can not be empty")
                return false
            }

            if (isEmpty(queryParameter.data.operator)) {
                showAlert(`Operator for column: ${queryParameter.column} is required`)
                return false
            }

            if (isEmpty(queryParameter.data.value) && ! ["IS NULL", 'IS NOT NULL'].includes(queryParameter.data.operator)) {
                showAlert(`Value for column: ${queryParameter.column} is required`)
                return false
            }

            if (! ["IS NULL", "IS NOT NULL", "IN (?)", "NOT IN (?)"].includes(queryParameter.data.operator) && 
                queryParameter.data.operator.split("?").length - 1 !== queryParameter.data.value.split(",").filter(val => val && val).length) {
                showAlert(`There are missing search values for column: ${queryParameter.column}`)
                return false
            }

            if (isEmpty(queryParameter.data.aggregator)) {
                emptySearchAggregators.push(queryParameter.column)
            }
        }

        if (emptySearchAggregators.length === 1) {
            let qps = queryParameters.filter(qp => ! isEmpty(qp.data))
            if (qps[qps.length - 1].column !== emptySearchAggregators[0]) {
                showAlert(`Please select an aggregator for column: ${emptySearchAggregators[0]}`)
                return false
            }
        } else if (emptySearchAggregators.length > 1) {
            showAlert(`Please select an aggregator for column: ${emptySearchAggregators[0]}`)
            return false
        } else{
            let qps = queryParameters.filter(qp => ! isEmpty(qp.data))
            showAlert(`Please remove the aggregator for column: ${qps[qps.length - 1].column}`)
            return false
        }

        return true
    }

    const showComplexSearch = (e) => {
        getElement(`complex-search-wrapper-${componentKey}`).classList.remove("d-none")
    }

    const hideComplexSearch = (e) => {
        getElement(`complex-search-wrapper-${componentKey}`).classList.add("d-none")
    }


//================================================================================================================================================================================================
    

    return (
        <div>
            <SimpleModal show={visibility} render={complexSearchRender} onClose={onCloseModal}/>
            <div className="complex-search-switch-container">
                <div className="complex-search-switch">
                    <Switch 
                        id={`complex-search-switch-${componentKey}`} 
                        labelLeft="Hide Advanced Search" 
                        labelRight="Show Advanced Search"
                        onLeft={hideComplexSearch}
                        onRight={showComplexSearch}
                    />
                </div>
            </div>

            <div id={`complex-search-wrapper-${componentKey}`} className="complex-search-container d-none">
                <div className="complex-search-head">
                    <div className="complex-search-cell">Column</div>
                    <div className="complex-search-cell">Operator</div>
                    <div className="complex-search-cell">Value</div>
                    <div className="complex-search-cell">Aggregator</div>
                </div>

                <div className="complex-search-body">
                    {columns.map(column => <div>
                        <div className="complex-search-row">
                            <div className="complex-search-cell complex-search-column">{snakeToBeautifulCase(column)}</div>
                            <div className="complex-search-cell">
                                <DropList selectName="Select Operator" options={operators} onSelect={(operator) => onSelectOperator(operator, column)}/>
                            </div>
                            <div className="complex-search-cell">
                                <input 
                                    id={column + "-input-" + componentKey} 
                                    type={getColumnDataType(column)} 
                                    className="complex-search-value" 
                                    placeholder={`Enter ${column} value`} 
                                    onChange={() => handleValueChange(column)} 
                                    autoComplete="off"
                                />
                            </div>
                            <div className="complex-search-cell">
                                <DropList selectName="Select Aggregator" options={aggregators} onSelect={(aggregator) => onSelectAggregator(aggregator, column)}/>
                            </div>
                        </div>
                    </div>)}
                </div>
                <div className="complex-search-button-container">
                    <button className="complex-search-button" onClick={startSearch}>Search <i className="uil uil-search"></i></button>
                </div>
            </div>
        </div>
    )
}

export default ComplexSearch


const RangeSearch = ({ operator, dataType, onGo, onCancel }) => {

    const componentKey = randomString(8)

    const onGoHandler = () => {
        let min = getElement("minimum-value-" + componentKey).value
        let max = getElement("maximum-value-" + componentKey).value

        if (isEmpty(min)) {
            showAlert("Please enter a minimum value")
            return
        }

        if (isEmpty(max)) {
            showAlert("Please enter a maximum value")
            return
        }

        onGo(min, max)
        onCancel()
    }

    return (
        <div>
            <div className="search-modal-header">Range Search</div>
            <div className="search-modal-content-wrapper">
                <div className="search-modal-operator">{operator}</div>
                <div className="search-modal-content">
                    <div className="range-search-input">
                        <div>Minimum Value: </div>
                        <input id={"minimum-value-" + componentKey} type={dataType} placeholder="Enter the range starting value" autoComplete="off"/>
                    </div>
                    <div className="range-search-input">
                        <div>Maximum Value: </div>
                        <input id={"maximum-value-" + componentKey} type={dataType} placeholder="Enter the range ending value" autoComplete="off"/>
                    </div>
                </div>
            </div>
            <div className="search-modal-buttons">
                    <button className="search-modal-button" onClick={onGoHandler}>Go</button>
                    <button className="search-modal-button" onClick={onCancel}>Cancel</button>
            </div>
        </div>
    )
}

const ListSearch = ({ operator, dataType, onGo, onCancel }) => {

    const [valueInputs, setvalueInputs] = useState([
        { id: 0, value: '' }
    ]);

    const handleInputFocus = (id) => {
        if (id === valueInputs.length - 1) {
            setvalueInputs([...valueInputs, { id: id + 1, value: '' }]);
        }
    }

    const handleInputChange = (id, event) => {
        const newValueInputs = [...valueInputs];
        newValueInputs[id].value = event.target.value;
        setvalueInputs(newValueInputs);
    }

    const onGoHandler = () => {
        onGo(valueInputs.filter(value => value.value && value.value).map(value => value.value))
        onCancel()
    }

    return (
        <div>
        <div className="search-modal-header">List Search</div>
        <div className="search-modal-content-wrapper">
            <div className="search-modal-operator">{operator}</div>
            <div className="search-modal-content">
                <div className="list-search-input">
                    {valueInputs.map(input => (
                        <input 
                            id={ "value-input-" + input.id } 
                            type={dataType} 
                            placeholder="Enter list item value" 
                            autoComplete="off" 
                            onFocus={() => handleInputFocus(input.id)}
                            onChange={(event) => handleInputChange(input.id, event)}
                            value={input.value}
                        />
                    ))}
                </div>
            </div>
        </div>
        <div className="search-modal-buttons">
                <button className="search-modal-button" onClick={onGoHandler}>Go</button>
                <button className="search-modal-button" onClick={onCancel}>Cancel</button>
        </div>
    </div>
    )
}