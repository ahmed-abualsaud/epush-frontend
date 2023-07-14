import '../assets/style/component/signin-signup-switch.css'

const SigninSignupSwitch = () => {
    return (
        <>
            <h6><span>Signin </span><span>Signup</span></h6>
            <input className="checkbox" type="checkbox" id="reg-log" name="reg-log"/>
            <label for="reg-log"></label>
        </>
    );
  };
  
  export default SigninSignupSwitch;