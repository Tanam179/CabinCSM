/* eslint-disable react/prop-types */
import styled from 'styled-components';

const StyledFormVertical = styled.div`
    width: 100%;
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

const FormVertical = ({ label, children, size }) => {
    return (
        <StyledFormVertical size={size}>
            <Label htmlFor={children.props.id}>{label}</Label>
            {children}
        </StyledFormVertical>
    );
};

export default FormVertical;
