import '../../assets/style/component/show-modal.css'
import { useEffect, useRef, useState } from 'react'

const ShowSales = ({ sales }) => {

    const [columns, setColumns] = useState([])

    const setupLock = useRef(true)
    const setup = async () => {

        setColumns(sales ? Object.keys(sales) : [])
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
                        <span key={ "show-" + col }>{ typeof sales[col] === 'boolean' ? sales[col] ? "Yes": "No" : sales[col] }</span>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default ShowSales