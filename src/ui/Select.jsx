/* eslint-disable react/prop-types */
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const StyledSelect = styled.select`
    font-size: 1.4rem;
    padding: 0.8rem 1.2rem;
    border: 1px solid ${(props) => (props.type === 'white' ? 'var(--color-grey-100)' : 'var(--color-grey-300)')};
    border-radius: var(--border-radius-sm);
    background-color: var(--color-grey-0);
    font-weight: 500;
    box-shadow: var(--shadow-sm);
`;

const Select = ({ options }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const sortByValue = searchParams.get('sortBy') || 'all';

    const handleChange = function(e) {
        searchParams.set('sortBy', e.target.value);
        searchParams.delete('page');
        setSearchParams(searchParams);
    }

    return (
        <StyledSelect defaultValue={ sortByValue } onChange={handleChange}>
            <option value="all" hidden>All</option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </StyledSelect>
    );
};

export default Select;
