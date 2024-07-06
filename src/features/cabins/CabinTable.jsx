import styled from 'styled-components';
import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import useCabins from '../../hooks/useCabins';

const Table = styled.div`
    border: 1px solid var(--color-grey-200);
    margin-top: 20px;
    font-size: 1.4rem;
    background-color: var(--color-grey-0);
    border-radius: 7px;
    overflow: hidden;
    margin-bottom: 30px;
`;

const TableHeader = styled.header`
    display: grid;
    grid-template-columns: 1.5fr 1.5fr 1.5fr 1.5fr 1fr 1fr;
    column-gap: 2.4rem;
    align-items: center;

    background-color: var(--color-grey-50);
    border-bottom: 1px solid var(--color-grey-100);
    text-transform: uppercase;
    letter-spacing: 0.4px;
    font-weight: 600;
    color: var(--color-grey-600);
    padding: 1.6rem 2.4rem;
`;

const CabinTable = () => {
    const { cabinsData, isPending } = useCabins();

    if (isPending) {
        return <Spinner />;
    }

    return (
        <Table role="table">
            <TableHeader role="row">
                <div>Cabin</div>
                <div>Image</div>
                <div>Capacity</div>
                <div>Price</div>
                <div>Discount</div>
                <div></div>
            </TableHeader>
            {cabinsData?.map((cabin) => (
                <CabinRow key={cabin.id} cabin={cabin} />
            ))}
        </Table>
    );
};

export default CabinTable;
