import React from 'react';
import {Helmet} from "react-helmet-async";
import {Col, Row, Input, Form, Button} from 'antd';
import {SigninButton, SigninColumn, SigninForm} from "./Signin.Styles";
import userSigninType, {useSigninUserMutation} from "../../redux/appQueryV1";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import Cookies from 'js-cookie';

const SignIn = ()=>{
    // @ts-ignore
    const [signinUser, result ]= useSigninUserMutation();
    const navigate = useNavigate();
    const handleSubmit = async(values: any)=>{
        let userDetails:userSigninType = {
            email: values.email,
            password: values.password
        }
        const signUserIn = await signinUser(userDetails);
        // @ts-ignore
        if (signUserIn.error) {
            alert("Something went wrong!")
        }else{
            const response = {...signUserIn};
            // @ts-ignore
            Cookies.set("user", response.data.uid, 7200000)
            navigate("/home");
        }
    }
    return (
        <React.Fragment>
            <Helmet title="Signin" />
            <Row justify="space-around" align="middle">
                <SigninColumn>
                    <SigninForm name="basic"
                          labelCol={{span: 8}}
                          wrapperCol={{span: 16}}
                          initialValues={{remember: true}}
                          onFinish={handleSubmit}
                          onFinishFailed={() => console.log("OnFinishFailed")}
                          autoComplete="off">
                        <Form.Item
                            label="Email"
                            name="email"
                            initialValue="maintestuser@example.com"
                            rules={[{required: true, message: 'Field can not be empty'}]}
                        >
                            <Input placeholder="e.g messaging@gmaik.cu" type="text"/>
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            initialValue="1234567890"
                            rules={[{required: true, message: 'Field can not be empty'}]}
                        >
                            <Input placeholder="password" type="password"/>
                        </Form.Item>
                        <Form.Item wrapperCol={{offset: 8, span: 16}}>
                            <SigninButton type="primary" htmlType="submit">Sign in</SigninButton>
                        </Form.Item>
                    </SigninForm>
                </SigninColumn>
            </Row>
        </React.Fragment>
    );
}

export default SignIn;