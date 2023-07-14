import Button from "../layout/Button"
import { useNavigate } from "react-router-dom"

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