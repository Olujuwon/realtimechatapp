import React, {useState} from 'react';
import {Helmet} from "react-helmet-async";

import {SignupAuthContainer} from "./Signup.Styles";
import AppFormComponent, {IFormDataProps} from '../../components/Form';
import {Alert} from 'react-bootstrap';

import userSignupType, {useSignupUserMutation} from "../../redux/appQueryV1";
import {userType} from '../../types/User/user';

import {Link, useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';


const SIGN_UP_FORM_DATA: Array<IFormDataProps> = [
    {
        name: "email",
        label: "Email/Username",
        infoText: "",
        type: "email",
        placeholder: "Enter your email address",
    }, {
        name: "password",
        label: "Password",
        infoText: "",
        type: "password",
        placeholder: "Enter password, min. of 8 characters",
    },
    {
        name: "repassword",
        label: "Repeat password",
        infoText: "",
        type: "password",
        placeholder: "Repeat password, must match with password",
    }
]

const SignUp = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [repassword, setRepassword] = useState<string>("");
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState<boolean>(true);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alartVariant, setAlartVariant] = useState<string>("light");
    const [alartMessage, setAlartMessage] = useState<string>("");
    const [signupUser, result] = useSignupUserMutation();
    const navigate = useNavigate();

    const _handleInputElementChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;
        const capitalizeInputName = name.charAt(0).toUpperCase() + name.slice(1);
        const setFunc = `set${capitalizeInputName}`;
        eval(setFunc)(value);//perhaps not the best method, it works for now and can be improved later!
        if (email !== "" && password !== "") {
            setSubmitButtonDisabled(false);
        }
    }
    const _handleSubmit = async (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const signUserUp: any = await signupUser({
            email: email,
            password: password
        } as userSignupType);
        if (signUserUp.data) navigate("/signin")
        else {
            const {error} = signUserUp;
            setAlartVariant("danger");
            setAlartMessage(error);
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 5000);
        }
    }
    return (
        <React.Fragment>
            <Helmet title="Sign up"/>
            <SignupAuthContainer>
                <div><p>Want to have a chat with AI? Sign up </p></div>
                <Alert variant={alartVariant} show={showAlert}>
                    {alartMessage}
                </Alert>
                <AppFormComponent
                    formData={SIGN_UP_FORM_DATA}
                    onChangeFormElement={_handleInputElementChange}
                    onSubmit={_handleSubmit} submitButtonDisabled={submitButtonDisabled}/>
                <div><p><Link to="/signin">Sign in</Link></p></div>
            </SignupAuthContainer>
        </React.Fragment>
    );
}

export default SignUp;