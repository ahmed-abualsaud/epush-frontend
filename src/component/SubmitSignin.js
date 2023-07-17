import useAuthApi from "../api/useAuthApi"
import Button from "../layout/Button"
import { isEmpty } from "../utils/helper"
import { useNavigate } from "react-router-dom"

const SubmitSignin = () => {

  const navigate = useNavigate()
  const { signin } = useAuthApi()
  

  const submitSigninHandler = async () => {
    let data = await signin()

    if (!isEmpty(data) && data.roles.includes('super_admin')) {
      navigate("/dashboard/super-admin")
    }

    if (!isEmpty(data) && data.roles.includes('admin')) {
      navigate("/dashboard/admin")
    }
  }

  return (
    <Button onClick={submitSigninHandler} > Submit </Button>
  )
}
  
export default SubmitSignin