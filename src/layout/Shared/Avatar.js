import { useEffect, useState } from "react"
import { getElement } from "../../utils/dom"
import "../../assets/style/layout/avatar.css"
import { randomString } from "../../utils/strUtils"

const Avatar = ({ imageUrl, onSelectAvatar }) => {

    const componentKey = "avatar-" + randomString(8)
    const placeholderImageUrl = "https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg";
    
    const [imagePreview, setImagePreview] = useState(imageUrl)

    useEffect(() => {
        setImagePreview(imageUrl || placeholderImageUrl);
    }, [imageUrl]);

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onload = function (e) {
            setImagePreview(e.target.result)
        }
        reader.readAsDataURL(file)
        onSelectAvatar && onSelectAvatar(file)
    }

    const clearAvatarInput = (e) => {
        e.target.value = null
    }

    return (
        <div className="image-container">
            {onSelectAvatar && <div className="avatar-hint">Click on the image to change the profile avatar!</div>}
            <div className="image-wrapper">
                <img src={imagePreview} alt="Avatar" />
                {onSelectAvatar && <>
                    <input id={componentKey} type="file" accept="image/*" onInput={handleImageChange} onChange={clearAvatarInput}/>
                    <i className="uil uil-camera-plus" onClick={() => getElement(componentKey).click()}></i>
                </>}
            </div>
        </div>
    )
}

export default Avatar