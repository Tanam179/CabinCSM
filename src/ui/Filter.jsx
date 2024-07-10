/* eslint-disable react/prop-types */
import { useSearchParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

const StyledFilter = styled.div`
    border: 1px solid var(--color-grey-100);
    background-color: var(--color-grey-0);
    box-shadow: var(--shadow-sm);
    border-radius: var(--border-radius-sm);
    padding: 0.4rem;
    display: flex;
    gap: 0.4rem;
`;

const FilterButton = styled.button`
    background-color: var(--color-grey-0);
    border: none;

    ${(props) =>
        props.active &&
        css`
            background-color: var(--color-brand-600);
            color: var(--color-brand-50);
        `}

    border-radius: var(--border-radius-sm);
    font-weight: 500;
    font-size: 1.4rem;
    /* To give the same height as select */
    padding: 0.44rem 0.8rem;
    transition: all 0.3s;

    &:hover:not(:disabled) {
        background-color: var(--color-brand-600);
        color: var(--color-brand-50);
    }
`;


const Filter = ({ filterField, options }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const value = searchParams.get(filterField) || options?.[0]?.value;

    const handleClick = function(value) {
        searchParams.set(filterField, value);
        setSearchParams(searchParams)
    }

    return (
        <StyledFilter>
            {/* <FilterButton onClick={() => handleClick('all')} active={value === 'all'}>All</FilterButton>
            <FilterButton onClick={() => handleClick('no-discount')} active={value === 'no-discount'}>No discount</FilterButton>
            <FilterButton onClick={() => handleClick('with-discount')} active={value === 'with-discount'}>With discount</FilterButton> */}
            {
                options.map(({ value: optionValue, label }) => (
                    <FilterButton
                        key={optionValue}
                        onClick={() => handleClick(optionValue)}
                        active={value === optionValue}
                        disabled={value === optionValue}
                    >
                        { label }
                    </FilterButton>
                ))
            }
        </StyledFilter>
    );
};

export default Filter;