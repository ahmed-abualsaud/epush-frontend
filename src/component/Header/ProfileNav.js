import { useSelector } from 'react-redux'
import '../../assets/style/component/profile-nav.css'
import useAuthApi from '../../api/useAuthApi'
import { navigate } from '../../setup/navigator'
import { isEmpty } from '../../utils/helper'

const ProfileNav = () => {

    const user = useSelector((state) => state.auth.user)
    
    const { signout } = useAuthApi()

    const logout = async (e) => {
        e.stopPropagation()
        await signout()
    }

    const goToSettings = () => {
        if (! isEmpty((user?.roles ?? []).filter(role => ["admin", "super_admin"].includes(role.name)))) {
            navigate("content", "list-settings")
        }
        else {
            navigate("content", "default")
        }
    }

    return (
        <div className="profile-nav">
            <h5 className="d-inline-block m-3 text-white"><strong>{user?.user?.full_name}</strong></h5>
            <img src={user?.user?.avatar ?? "https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg"} className="rounded-circle" style={{width: "70px", height: "70px"}} alt="Avatar" />
            <input className="dropdown d-none" type="checkbox" id="dropdown" name="dropdown"/>
            <label className="for-dropdown" for="dropdown"><i className="uil uil-angle-double-down"></i></label>
            <div className="section-dropdown"> 
                <a href="#" onClick={() => navigate("content", "profile", user?.user)}>Profile <i className="uil uil-user-md"></i></a>
                <a href="#" onClick={goToSettings}>Settings <i className="uil uil-setting"></i></a>
                <a href="#" onClick={ logout }>Logout <i className="uil uil-sign-out-alt"></i></a>
            </div>
        </div>
    )
  }
  
  export default ProfileNav