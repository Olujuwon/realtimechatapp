import React, {useState} from 'react';
import {Helmet} from "react-helmet-async";

import { Alert} from "react-bootstrap";
import {SigninAuthContainer} from "./Signin.Styles";
import AppFormComponent, {IFormDataProps} from '../../components/Form';

import userSigninType from "../../redux/appQueryV1";
import useManageAuthUser from "../../hooks/useManageAuthUser";

import {Link, useNavigate} from "react-router-dom";

const SIGN_IN_FORM_DATA: Array<IFormDataProps> = [
    {
        name: "email",
        label: "Email/Username",
        infoText: "",
        type: "email",
        placeholder: "",
        required: true,
    },
    {
        name: "password",
        label: "Password",
        infoText: "",
        type: "password",
        placeholder: "",
        required: true,
    }
]
const SignIn = () => {
    const {handleSigninUser} = useManageAuthUser();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState<boolean>(true);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alartVariant, setAlartVariant] = useState<string>("light");
    const [alartMessage, setAlartMessage] = useState<string>("");
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
        const user: any = await handleSigninUser({
            email: email,
            password: password
        } as userSigninType);
        if (user.data) navigate("/messaging")
        else {
            const {error} = user;
            setAlartVariant("danger");
            setAlartMessage(error);
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 5000);
        }
    }

    return (
        <React.Fragment>
            <Helmet title="Signin"/>
            <SigninAuthContainer>
                <div><p>Want to have a chat with AI? Sign in </p></div>
                <Alert variant={alartVariant} show={showAlert}>
                    {alartMessage}
                </Alert>
                <AppFormComponent
                    formData={SIGN_IN_FORM_DATA}
                    onChangeFormElement={_handleInputElementChange}
                    onSubmit={_handleSubmit} submitButtonDisabled={submitButtonDisabled}/>
                <div><p>Are you new? <Link to="/signup">Sign up</Link></p></div>
            </SigninAuthContainer>
        </React.Fragment>
    );
}

export default SignIn;