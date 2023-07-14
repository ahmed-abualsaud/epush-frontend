import Button from "../layout/Button"
import { useNavigate } from "react-router-dom"

const SubmitSignup = () => {

  const navigate = useNavigate()

  const submitSignupHandler = () => {
  
    navigate("/dashboard/super-admin")
  
  }

  return (
    <Button onClick={submitSignupHandler} > Submit </Button>
  );
};
  
export default SubmitSignup;