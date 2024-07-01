import Heading from '../ui/Heading';
import Row from '../ui/Row';
import CabinTable from '../features/cabins/CabinTable';
import { Fragment } from 'react';

function Cabins() {
    

    return (
        <Fragment>
            <Row type="horizontal">
                <Heading as="h1">All cabins</Heading>
                <p>Filter / Sort</p>
            </Row>
            <Row>
                <CabinTable></CabinTable>
            </Row>
        </Fragment>
    );
}

export default Cabins;
