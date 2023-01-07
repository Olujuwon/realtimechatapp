import {Typography, Result} from "antd";
import {Button, FloatingLabel, Form} from "react-bootstrap";
import React, {useState} from "react";


const {Title} = Typography;

interface ComponentProps {
    onSubmit: ()=>void;
    success: boolean;
    onChangeFormElement: (event: React.ChangeEvent<HTMLInputElement>)=>void;
}

interface FormDataProps {
    name: string;
    label: string;
    infoText: string;
    type: string;
    placeholder: string;
}

const addContactFormData: Array<FormDataProps> = [
    {
        name: "firstName",
        label: "Firstname",
        infoText: "",
        type: "text",
        placeholder: "",
    },
    {
        name: "lastName",
        label: "Lastname",
        infoText: "",
        type: "text",
        placeholder: "",
    },
    {
        name: "email",
        label: "Email address",
        infoText: "",
        type: "email",
        placeholder: "",
    },
    {
        name: "phoneNumber",
        label: "Phone number",
        infoText: "",
        type: "text",
        placeholder: "",
    }
]

const FormComponent = ({
                           onSubmit,
                           onChangeFormElement
                       }: {
    onSubmit: ()=>void,
    onChangeFormElement: (event: React.ChangeEvent<HTMLInputElement>)=>void
}) => {
    return (
        <Form onSubmit={onSubmit}>
            {addContactFormData.map((formData, index: number) => {
                return (
                    <Form.Group className="mb-3" controlId={formData.name}>
                        <FloatingLabel
                            controlId={`${formData.name}-label`}
                            label={formData.label}
                            className="mb-2"
                        ><Form.Control type={formData.type} placeholder={formData.placeholder}
                                       onChange={onChangeFormElement} name={formData.name}/></FloatingLabel>
                        <Form.Text className="text-muted">
                            {formData.infoText}
                        </Form.Text>
                    </Form.Group>
                )
            })}
            <Button variant="primary" type="submit" className="width-50">Submit</Button>
        </Form>
    )
}

const AddNewContact: React.FC<ComponentProps> = ({onSubmit, success, onChangeFormElement}) => {
    return (
        <>
            <h3>Add a new contact</h3>
            {success ? null : <FormComponent onSubmit={onSubmit} onChangeFormElement={onChangeFormElement}/>}
            {!success ? null :
                <Result status="success" title="Contact created" subTitle="Contact created successfully!"/>}
        </>
    );
}

export default AddNewContact;