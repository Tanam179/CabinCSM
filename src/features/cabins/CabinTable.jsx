import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import useCabins from '../../hooks/useCabins';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';


const CabinTable = () => {
    const { cabinsData, isPending } = useCabins();
    const [searchParams] = useSearchParams();

    if (isPending) {
        return <Spinner />;
    }

    const filterValue = searchParams.get('discount') || 'all';
    const sortByValue = searchParams.get('sortBy') || 'all';

    let filterCabins;

    if(filterValue === 'all') {
        filterCabins = cabinsData;
    } else if(filterValue === 'no-discount') {
        filterCabins = cabinsData.filter((cabin) => cabin.discount === 0);
    } else {
        filterCabins = cabinsData.filter((cabin) => cabin.discount > 0);
    }

    if(sortByValue !== 'all') {
        const [field, direction] = sortByValue.split('-');
        const modifier = direction === 'asc' ? 1 : -1;
        filterCabins = filterCabins.sort((a, b) => (a[field] - b[field]) * modifier);
    }

    console.log(filterCabins);

    return (
        <Menus>
            <Table columns="1.5fr 1.5fr 1.5fr 1.5fr 1fr 1fr">
                <Table.Header>
                    <div>Cabin</div>
                    <div>Image</div>
                    <div>Capacity</div>
                    <div>Price</div>
                    <div>Discount</div>
                    <div></div>
                </Table.Header>
                <Table.Body data={filterCabins} render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />} />
            </Table>
        </Menus>
    );
};

export default CabinTable;
