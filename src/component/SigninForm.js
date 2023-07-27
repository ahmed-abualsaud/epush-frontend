import '../assets/style/component/signin-form.css'
import Form from '../layout/Form'
import Input from '../layout/Input';
import { Link } from "react-router-dom";
import SubmitSignin from './SubmitSignin';

const SigninForm = ({ className }) => {

    return (
        <Form id ="signin_form" className={ className }>
            <h4 className="mb-4 pb-3 text-white form-title">Sign In</h4>
            <Input id="username" type="name" placeholder="Username" validrules="required">
                <i className="input-icon uil uil-user-check"></i>
            </Input>

            <Input id="password" type="password" placeholder="Password" validrules="required">
                <i className="input-icon uil uil-lock-alt"></i>
            </Input>

            <SubmitSignin />
            
            <p className="mb-0 mt-4 text-center">
                <Link to="/" className="link">Forgot your password?</Link>
            </p>
        </Form>
    );
  };
  
  export default SigninForm;