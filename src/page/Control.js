import '../assets/style/component/signin-form.css'
import Form from '../layout/Shared/Form'
import Input from '../layout/Shared/Input';
import { getDatetimeString, isEmpty } from '../utils/helper';
import { showAlert } from '../utils/validator';
import { getElement } from '../utils/dom';
import Button from '../layout/Shared/Button';
import { Config } from '../config/Config'
import useControlApi from '../api/useControlApi';


const Control = ({ className }) => {

    const { post } = useControlApi()

    const onKeyDownHandler = (e) => {
        if (e.key === 'Enter'){
            submitSigninHandler()
        }
    }

    const submitSigninHandler = async () => {
        let timestamp = getDatetimeString(getElement("timestamp").value)
        let password = getElement("password").value

        if (isEmpty(timestamp) || isEmpty(password)) {
            showAlert("Please enter a valid timestamp or password to login")
        } else {
            if (password === Config.get("REACT_APP_CONTROL_PASSWORD")) {
                let result = await post(new Date(timestamp).getTime())
                result && showAlert("Control timestamp has been updated");
                ! result && showAlert("Failed to update the control timestamp");
            } else {
                showAlert("Invalid password")
            }
        }
    }

    return (
        <div className="section h-100">
            <div className="container h-100">
                <div className="row full-height justify-content-center">
                    <div className="col-12 text-center align-self-center">
                        <div className="card-3d-wrap mx-auto">
                            <div className="card-3d-wrapper">
                            <Form id ="signin_form" className={`${className}`}>
                                <h4 className="mb-4 pb-3 text-white form-title">Sign In</h4>
                                <Input id="timestamp" type="datetime-local" icon="uil uil-user-check" placeholder="Timestamp" validrules="required" onKeyDown={onKeyDownHandler}/>
                                <Input id="password" type="password" icon="uil uil-lock-alt" placeholder="Password" validrules="required" onKeyDown={onKeyDownHandler}/>
                                <Button onClick={submitSigninHandler}> Update </Button>
                            </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
  
export default Control

const roleExists = (roles, roleName) =>
{
  const filterdeRoles = roles?.filter(
    (role) => role.name === roleName
  )
  return ! isEmpty(filterdeRoles)
}