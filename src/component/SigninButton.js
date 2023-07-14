import Button from "../layout/Button"
import { useNavigate } from "react-router-dom"

const SigninButton = () => {

  const navigate = useNavigate()

  const signinHandler = () => {
    navigate("/signin")
  }

  return (
    <Button onClick={signinHandler}> Sign In </Button>
  );
};
  
export default SigninButton;