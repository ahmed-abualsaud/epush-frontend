import "../assets/style/component/signup-form.css";
import Form from "../layout/Form";
import Input from "../layout/Input";
import SubmitSignup from "./SubmitSignup";

const SignupForm = ({ className }) => {
  return (
    <Form className={className}>

      <h4 className="mb-4 pb-3 text-white form-title">Sign Up</h4>
      <Input className="w-49 d-inline-block me-1" id="first_name" type="text" placeholder="First Name" validrules="required">
        <i className="input-icon uil uil-user"></i>
      </Input>

      <Input className="w-49 d-inline-block ms-1" id="last_name" type="text" placeholder="Last Name" validrules="required">
        <i className="input-icon uil uil-users-alt"></i>
      </Input>

      <Input id="username" type="text" placeholder="Username" validrules="required">
        <i className="input-icon uil uil-user-md"></i>
      </Input>

      <Input id="email" type="email" placeholder="Email" validrules="required">
        <i className="input-icon uil uil-at"></i>
      </Input>

      <Input id="phone" type="tel" placeholder="Phone Number" validrules="required">
        <i className="input-icon uil uil-phone"></i>
      </Input>

      <Input id="religion" type="text" placeholder="Religion" validrules="required">
        <i className="input-icon uil uil-flower"></i>
      </Input>

      <Input id="password" type="password" placeholder="Password" validrules="required|strong_password">
        <i className="input-icon uil uil-lock-alt"></i>
      </Input>

      <Input id="password_confirmation" type="password" placeholder="Confirm Password" validrules="required|strong_password">
        <i className="input-icon uil uil-lock-alt"></i>
      </Input>

      <SubmitSignup />
      
    </Form>
  );
};

export default SignupForm;
