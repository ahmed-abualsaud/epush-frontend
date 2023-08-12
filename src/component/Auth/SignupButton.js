import { useNavigate } from "react-router-dom"
import Button from "../../layout/Shared/Button"

const SignupButton = () => {

  const navigate = useNavigate()

  const signupHandler = () => {
    navigate("/signup")
  }

  return (
    <Button onClick={signupHandler} > Sign Up </Button>
  );
};
  
export default SignupButton;