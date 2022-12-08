import {Form, Input, Button, Typography, Result} from "antd";

const {Title} = Typography;

type componentProps = {
    onFinish: (values: any)=>void,
    success: boolean
}

function AddNewContact({onFinish, success}:componentProps): JSX.Element {
    return (
        <>
            {success ? null : <Form name="basic"
                                    labelCol={{span: 8}}
                                    wrapperCol={{span: 16}}
                                    initialValues={{remember: true}}
                                    onFinish={onFinish}
                                    onFinishFailed={() => console.log("OnFinishFailed")}
                                    autoComplete="off">
                <Title level={3}>Add a new contact</Title>
                <Form.Item
                    label="Firstname:"
                    name="firstname"
                    rules={[{required: true, message: 'Field can not be empty'}]}
                >
                    <Input placeholder="Firstname"/>
                </Form.Item>
                <Form.Item
                    label="Lastname:"
                    name="lastname"
                    rules={[{required: true, message: 'Field can not be empty'}]}
                >
                    <Input placeholder="Lastname"/>
                </Form.Item>
                <Form.Item
                    label="Email:"
                    name="email"
                    rules={[{required: true, message: 'Field can not be empty'}]}
                >
                    <Input placeholder="Email address"/>
                </Form.Item>
                <Form.Item
                    label="Phone:"
                    name="phone"
                    rules={[{required: true, message: 'Field can not be empty'}]}
                >
                    <Input placeholder="Phone number"/>
                </Form.Item>
                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button type="primary" htmlType="submit">Create new contact</Button>
                </Form.Item>
            </Form>}
            {!success ? null : <Result status="success" title="Contact created" subTitle="Contact created successfully!"/>}
        </>
    );
}

export default AddNewContact;