import useAuthApi from "../../api/useAuthApi"
import Button from "../../layout/Shared/Button"
import { isEmpty, roleExists } from "../../utils/helper"
import { useNavigate } from "react-router-dom"
import { showAlert } from "../../utils/validator"

const SubmitSignin = () => {

  const navigate = useNavigate()
  const { signin } = useAuthApi()
  

  const submitSigninHandler = async () => {
    let data = await signin()

    if (! isEmpty(data) && roleExists(data.roles, "super_admin")) {
      navigate("/super-admin")
    }

    if (! isEmpty(data) && roleExists(data.roles, "admin")) {
      navigate("/admin")
    }

    if (! isEmpty(data) && roleExists(data.roles, "client")) {
      navigate("/client")
    }

    if (! isEmpty(data) && roleExists(data.roles, "partner")) {
      navigate("/partner")
    }

    if (isEmpty(data) || isEmpty(data.roles)) {
      navigate("/")
      showAlert("Your Role is Unknown!")
    }
  }

  return (
    <Button onClick={submitSigninHandler} > Submit </Button>
  )
}
  
export default SubmitSignin