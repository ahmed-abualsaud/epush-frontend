import '../../assets/style/component/show-modal.css'
import { useEffect, useRef, useState } from 'react'

const ShowPaymentMethod = ({ paymentMethod }) => {

    const [columns, setColumns] = useState([])

    const setupLock = useRef(true)
    const setup = async () => {

        setColumns(paymentMethod ? Object.keys(paymentMethod) : [])
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
                        <span key={ "show-" + col }>{ typeof paymentMethod[col] === 'boolean' ? paymentMethod[col] ? "Yes": "No" : paymentMethod[col] }</span>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default ShowPaymentMethod