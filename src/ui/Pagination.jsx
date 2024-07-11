/* eslint-disable react/prop-types */
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const StyledPagination = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Select = styled.select`
    font-size: 1.4rem;
    padding: 0.8rem 1.2rem;
    border: 1px solid ${(props) => (props.type === 'white' ? 'var(--color-grey-100)' : 'var(--color-grey-300)')};
    border-radius: var(--border-radius-sm);
    background-color: var(--color-grey-0);
    font-weight: 500;
    box-shadow: var(--shadow-sm);
`;

const P = styled.p`
    font-size: 1.4rem;
    margin-left: 0.8rem;

    & span {
        font-weight: 600;
    }
`;

const Buttons = styled.div`
    display: flex;
    gap: 0.6rem;
`;

const PaginationButton = styled.button`
    background-color: ${(props) => (props.active ? ' var(--color-brand-600)' : 'var(--color-grey-50)')};
    color: ${(props) => (props.active ? ' var(--color-brand-50)' : 'inherit')};
    border: none;
    border-radius: var(--border-radius-sm);
    font-weight: 500;
    font-size: 1.4rem;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    padding: 0.6rem 1.2rem;
    transition: all 0.3s;

    &:has(span:last-child) {
        padding-left: 0.4rem;
    }

    &:has(span:first-child) {
        padding-right: 0.4rem;
    }

    & svg {
        height: 1.8rem;
        width: 1.8rem;
    }

    &:hover:not(:disabled) {
        background-color: var(--color-brand-600);
        color: var(--color-brand-50);
    }
`;


const Pagination = ({ count, numbDataPerPage, onChange }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const currentPage = searchParams.get('page') || 1;

    

    const handleClick = function(page) {
        searchParams.set('page', page);
        setSearchParams(searchParams)
    }

    return (
        <StyledPagination>
            <P>
                Showing <span>{ (currentPage - 1) * numbDataPerPage + 1 }</span> to <span>{ count - (currentPage - 1) * numbDataPerPage + 1 < numbDataPerPage ? count : currentPage * numbDataPerPage }</span> of <span>{ count }</span> results
            </P>
            <Select defaultValue={numbDataPerPage} onChange={(e) => onChange(e.target.value)}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </Select>
            <Buttons>
                {
                    Array.from({ length: Math.ceil(count / numbDataPerPage) }).fill(null).map((el, ind) => (
                        <PaginationButton disabled={ currentPage === ind + 1 } onClick={() => handleClick(ind + 1)} active={ ind + 1 == currentPage } key={ind}>{ ind + 1 }</PaginationButton>
                    ))
                }
            </Buttons>
        </StyledPagination>
    );
};

export default Pagination;