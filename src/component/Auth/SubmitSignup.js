import Button from "../../layout/Shared/Button"
import { useNavigate } from "react-router-dom"

const SubmitSignup = () => {

  const navigate = useNavigate()

  const submitSignupHandler = () => {
  
    // navigate("/super-admin")
  
  }

  return (
    <Button onClick={submitSignupHandler} > Submit </Button>
  );
};
  
export default SubmitSignup;