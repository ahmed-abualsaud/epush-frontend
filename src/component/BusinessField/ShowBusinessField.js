import '../../assets/style/component/show-modal.css'
import { useEffect, useRef, useState } from 'react'

const ShowBusinessField = ({ businessField }) => {

    const [columns, setColumns] = useState([])

    const setupLock = useRef(true)
    const setup = async () => {

        setColumns(businessField ? Object.keys(businessField) : [])
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
                        <span key={ "show-" + col }>{ typeof businessField[col] === 'boolean' ? businessField[col] ? "Yes": "No" : businessField[col] }</span>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default ShowBusinessField