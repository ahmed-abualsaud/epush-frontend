import "../assets/style/component/signup-form.css";
import Form from "../layout/Form";
import Input from "../layout/Input";
import SubmitSignup from "./SubmitSignup";

const SignupForm = ({ className }) => {
  return (
    <Form className={className}>

      <h4 className="mb-4 pb-3 text-white form-title">Sign Up</h4>
      <Input id="username" type="text" placeholder="Username" validrules="required">
        <i className="input-icon uil uil-user"></i>
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

      <Input id="contact_name" type="text" placeholder="Contact Name" validrules="required">
        <i className="input-icon uil uil-envelope-star"></i>
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
