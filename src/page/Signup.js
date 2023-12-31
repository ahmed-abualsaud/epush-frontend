import '../assets/style/page/signup.css'
import SigninForm from '../component/Auth/SigninForm';
import SignupForm from '../component/Auth/SignupForm';
import BackButton from '../layout/Shared/BackButton';
import SigninSignupSwitch from '../component/Auth/SigninSignupSwitch';

const Signup = () => {  
    return (
        <div className="section h-100">
            <div className="container h-100">
                <div className="row full-height justify-content-center">
                    <div className="col-12 text-center align-self-center">
                        <div className="section text-center"></div>
                        <SigninSignupSwitch />
                        <div className="card-3d-wrap mx-auto">
                            <div className="card-3d-wrapper">
                                <SignupForm />
                                <SigninForm className="card-back" />
                            </div>
                        </div>
                        <BackButton />
                    </div>
                </div>
            </div>
        </div>
    );
  };
  
  export default Signup;