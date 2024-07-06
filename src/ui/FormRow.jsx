/* eslint-disable react/prop-types */
import styled from "styled-components";

const StyledFormRow = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    width: 600px;
    padding: 1.2rem 0;

    &:first-child {
        padding-top: 0;
    }

    &:last-child {
        padding-bottom: 0;
    }

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }

    &:has(button) {
        display: flex;
        justify-content: flex-end;
        gap: 1.2rem;
    }
`;

const Label = styled.label`
    font-weight: 500;
`;

const Error = styled.span`
    font-size: 1.2rem;
    color: var(--color-red-700);
    font-weight: 600;
`;

const FormRow = ({ label, errors, children }) => {
    return (
        <StyledFormRow>
            <Label htmlFor={ label === 'Cabin photo' ? children[0].props.id : children.props.id}>{ label }</Label>
            { children }
            {errors && <Error>{errors.message}</Error>}
        </StyledFormRow>
    );
};

export default FormRow;
