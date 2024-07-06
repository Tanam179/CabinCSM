import { Fragment, useState } from 'react';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import CabinTable from '../features/cabins/CabinTable';
import Button from '../ui/Button';
import CreateEditCabinForm from '../features/cabins/CreateEditCabinForm';

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
                {showFormAddNewCabin && <CreateEditCabinForm />}
            </Row>
        </Fragment>
    );
}

export default Cabins;
