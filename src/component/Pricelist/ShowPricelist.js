import '../../assets/style/component/show-modal.css'
import { useEffect, useRef, useState } from 'react'

const ShowPricelist = ({ pricelist }) => {

    const [columns, setColumns] = useState([])

    const setupLock = useRef(true)
    const setup = async () => {

        setColumns(pricelist ? Object.keys(pricelist) : [])
    }

    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])


    return (
        <div className="show-modal-wrapper">
            <div className={"show-modal-info-wrapper w-100"}>
                {columns.map((col) => (
                    <div className="show-modal-info">
                        <span className="show-modal-info-column">{col}: </span>
                        <span key={ "show-" + col }>{ typeof pricelist[col] === 'boolean' ? pricelist[col] ? "Yes": "No" : pricelist[col] }</span>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default ShowPricelist