import Heading from '../ui/Heading';
import Row from '../ui/Row';
import CabinTable from '../features/cabins/CabinTable';
import { Fragment, useState } from 'react';
import Button from '../ui/Button';
import CreateCabinForm from '../features/cabins/CreateCabinForm';

function Cabins() {
    const [showFormAddNewCabin, setShowFormAddNewCabin] = useState(false);

    const handleShowFormAddNewCabin = function () {
        setShowFormAddNewCabin(true);
    };

    return (
        <Fragment>
            <Row type="horizontal">
                <Heading as="h1">All cabins</Heading>
                <p>Filter / Sort</p>
            </Row>
            <Row>
                <CabinTable></CabinTable>
            </Row>
            <Row type="horizontal">
                <Button onClick={handleShowFormAddNewCabin}>
                    Add New Cabin
                </Button>
                {showFormAddNewCabin && <CreateCabinForm />}
            </Row>
        </Fragment>
    );
}

export default Cabins;
