import "../../assets/style/component/signup-form.css";
import Form from "../../layout/Shared/Form";
import Input from "../../layout/Shared/Input";
import SubmitSignup from "./SubmitSignup";

const SignupForm = ({ className }) => {
  return (
    <Form className={className}>

      <h4 className="mb-4 pb-3 text-white form-title">Sign Up</h4>
      <Input className="w-49 d-inline-block me-1" id="first_name" icon="uil uil-user" type="text" placeholder="First Name" validrules="required"/>
      <Input className="w-49 d-inline-block ms-1" id="last_name" icon="uil uil-users-alt" type="text" placeholder="Last Name" validrules="required"/>
      <Input id="username" icon="uil uil-user-md" type="text" placeholder="Username" validrules="required"/>
      <Input id="email" icon="uil uil-at" type="email" placeholder="Email" validrules="required"/>
      <Input id="phone" icon="uil uil-phone" type="tel" placeholder="Phone Number" validrules="required"/>
      <Input id="religion" icon="uil uil-flower" type="text" placeholder="Religion" validrules="required"/>
      <Input id="password" icon="uil-lock-alt" type="password" placeholder="Password" validrules="required|strong_password"/>
      <Input id="password_confirmation" icon="uil-lock-alt" type="password" placeholder="Confirm Password" validrules="required|strong_password"/>

      <SubmitSignup />
      
    </Form>
  );
};

export default SignupForm;
