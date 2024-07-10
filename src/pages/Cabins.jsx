import { Fragment } from 'react';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import CabinTable from '../features/cabins/CabinTable';
import AddCabin from '../features/cabins/AddCabin';
import CabinTableOperations from '../features/cabins/CabinTableOperations';


function Cabins() {
    return (
        <Fragment>
            <Row type="horizontal">
                <Heading as="h1">All cabins</Heading>
                <CabinTableOperations/>
            </Row>
            <Row>
                <CabinTable></CabinTable>
            </Row>
            <Row type="horizontal">
                <AddCabin/>
            </Row>
        </Fragment>
    );
}

export default Cabins;
