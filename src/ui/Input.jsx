import styled from "styled-components";

const Input = styled.input`
    ${ props => props.err ? 'border: 1px solid #ef4444' : 'border: 1px solid var(--color-grey-300)'};
    ${ props => props.err ? 'background-color: #fef2f2' : 'background-color: var(--color-grey-0)' };
    border-radius: var(--border-radius-sm);
    box-shadow: var(--shadow-sm);
    border-radius: 5px;
    padding: 0.8rem 1.2rem;
`;

export default Input