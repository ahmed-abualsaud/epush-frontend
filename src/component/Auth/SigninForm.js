import '../../assets/style/component/signin-form.css'
import Form from '../../layout/Shared/Form'
import Input from '../../layout/Shared/Input';
import { Link } from "react-router-dom";
import SubmitSignin from './SubmitSignin';
import { isEmpty } from '../../utils/helper';
import { showAlert } from '../../utils/validator';
import { getElement } from '../../utils/dom';
import useAuthApi from "../../api/useAuthApi"
import { useNavigate } from "react-router-dom"


const SigninForm = ({ className }) => {

    const navigate = useNavigate()
    const { signin } = useAuthApi()

    const onKeyDownHandler = (e) => {
        if (e.key === 'Enter'){
            if (isEmpty(getElement("username").value) || isEmpty(getElement("password").value)) {
                showAlert("Please enter a valid email address or password to login")
            } else {
                submitSigninHandler()
            }
        }
    }

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
    
        if (isEmpty(data) || isEmpty(data.roles)) {
          navigate("/")
          showAlert("Your Role is Unknown!")
        }
      }

    return (
        <Form id ="signin_form" className={ className }>
            <h4 className="mb-4 pb-3 text-white form-title">Sign In</h4>
            <Input id="username" type="name" icon="uil uil-user-check" placeholder="Username" validrules="required" onKeyDown={onKeyDownHandler}/>
            <Input id="password" type="password" icon="uil uil-lock-alt" placeholder="Password" validrules="required" onKeyDown={onKeyDownHandler}/>
            <SubmitSignin />
            
            <p className="mb-0 mt-4 text-center">
                <Link to="/" className="link">Forgot your password?</Link>
            </p>
        </Form>
    )
}
  
export default SigninForm

const roleExists = (roles, roleName) =>
{
  const filterdeRoles = roles?.filter(
    (role) => role.name === roleName
  )
  return ! isEmpty(filterdeRoles)
}