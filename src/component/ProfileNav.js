import { useSelector } from 'react-redux';
import '../assets/style/component/profile-nav.css'

const ProfileNav = () => {

    const user = useSelector((state) => state.auth.user)

    return (
        <div className="profile-nav">
            <h5 className="d-inline-block m-3 text-white"><strong>{user?.user.username}</strong></h5>
            <img src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp" className="rounded-circle" style={{width: "70px"}} alt="Avatar" />
            <input className="dropdown" type="checkbox" id="dropdown" name="dropdown"/>
            <label className="for-dropdown" for="dropdown"><i className="uil uil-angle-double-down"></i></label>
            <div className="section-dropdown"> 
                <a href="#">Profile <i className="uil uil-user-md"></i></a>
                <a href="#">Settings <i className="uil uil-setting"></i></a>
                <a href="#">Logout <i className="uil uil-sign-out-alt"></i></a>
            </div>
        </div>
    )
  }
  
  export default ProfileNav;