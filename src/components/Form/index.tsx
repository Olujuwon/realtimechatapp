import React, {useState} from "react";
import styled from "styled-components";

import {FloatingLabel, Form, Button} from "react-bootstrap";


export interface IFormDataProps {
    name: string;
    label: string;
    infoText: string;
    type: string;
    placeholder: string;
    required: boolean;
}

interface IComponentProps {
    onSubmit: (values: any) => Promise<void>;
    onChangeFormElement: (event: React.ChangeEvent<HTMLInputElement>) => void;
    formData: Array<IFormDataProps>;
    submitButtonDisabled?: boolean;
}

const AppFormComponent: React.FC<IComponentProps> = ({
                                                         onSubmit,
                                                         onChangeFormElement,
                                                         formData
                                                     }) => {
    const [validated, setValidated] = useState(false);
    const _handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        onSubmit(event);
    };

    return (
        <AppForm validated={validated} onSubmit={_handleSubmit}>
            {formData.map((formData, index: number) => {
                return (
                    <Form.Group key={`app-form-${index}`} className="mb-3"
                                controlId={formData.name}>
                        <FloatingLabel
                            controlId={`${formData.name}`}
                            label={formData.label}
                            className="mb-2"
                        ><Form.Control type={formData.type} placeholder={formData.placeholder}
                                       onChange={onChangeFormElement}
                                       name={formData.name}
                                       required={formData.required}/></FloatingLabel>
                        <Form.Text className="text-muted">
                            {formData.infoText}
                        </Form.Text>
                    </Form.Group>
                )
            })}
            <Button variant="primary" type="submit" className="w-100 py-3"
                    disabled={false}>Submit</Button>
        </AppForm>
    )
}

export default AppFormComponent;

const AppForm = styled(Form)`
  width: '100%'
`;