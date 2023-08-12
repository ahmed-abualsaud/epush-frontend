import '../../assets/style/component/show-modal.css'
import { useEffect, useRef, useState } from 'react'

const ShowRole = ({ role }) => {

    const [columns, setColumns] = useState([])

    const setupLock = useRef(true)
    const setup = async () => {

        setColumns(role ? Object.keys(role) : [])
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
                        <span key={ "show-" + col }>{ typeof role[col] === 'boolean' ? role[col] ? "Yes": "No" : role[col] }</span>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default ShowRole