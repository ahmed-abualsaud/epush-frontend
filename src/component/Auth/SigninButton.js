import { useNavigate } from "react-router-dom"
import Button from "../../layout/Shared/Button"

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