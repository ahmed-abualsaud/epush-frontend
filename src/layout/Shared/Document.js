import { useEffect, useState } from "react"
import { getElement } from "../../utils/dom"
import "../../assets/style/layout/document.css"
import { randomString } from "../../utils/strUtils"
import dummyPDF from "../../assets/image/dummy-pdf.jpg"

const Document = ({ imageUrl, onSelectDocument }) => {

    const componentKey = "document-" + randomString(8)

    const [scale, setScale] = useState(1)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const placeholderImageUrl = dummyPDF;
    
    const [imagePreview, setImagePreview] = useState(imageUrl)

    useEffect(() => {
        setImagePreview(imageUrl || placeholderImageUrl);
    }, [imageUrl]);

    const handleZoomIn = () => {
        setScale(scale + 0.1);
    };

    const handleZoomOut = () => {
        if (scale > 0.1) {
        setScale(scale - 0.1);
        }
    };

    const handleMouseDown = (event) => {
        event.preventDefault()
        let startX = event.clientX
        let startY = event.clientY

        const handleMouseMove = (event) => {
            const deltaX = event.clientX - startX
            const deltaY = event.clientY - startY

            setPosition((prevPosition) => ({
                x: prevPosition.x + deltaX,
                y: prevPosition.y + deltaY,
            }))

            startX = event.clientX
            startY = event.clientY
        }

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onload = function (e) {
            setImagePreview(e.target.result)
        }
        reader.readAsDataURL(file)
        onSelectDocument && onSelectDocument(file)
    }

    const clearDocumentInput = (e) => {
        e.target.value = null
    }

    return (
        <div className="document-container">
            <div className="document-wrapper">
                <div className="document-button-container">
                    <button className="document-button" onClick={handleZoomIn}><i className="fas fa-magnifying-glass-plus"></i></button>
                    <button className="document-button" onClick={handleZoomOut}><i className="fas fa-magnifying-glass-minus"></i></button>
                </div>
                {onSelectDocument && 
                <div className="input-icon">
                    <input id={componentKey} type="file" onInput={handleImageChange} onChange={clearDocumentInput}/>
                    <i className="uil uil-camera-plus" onClick={() => getElement(componentKey).click()}></i>
                </div>}
                <img 
                    src={imagePreview} 
                    alt="Document" 
                    onMouseDown={handleMouseDown}
                    style={{
                        transform: `scale(${scale})`,
                        position: 'absolute',
                        left: `${position.x}px`,
                        top: `${position.y}px`,
                        cursor: 'move',
                    }}
                />
            </div>
        </div>
    )
}

export default Document