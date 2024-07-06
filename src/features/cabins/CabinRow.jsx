/* eslint-disable react/prop-types */
import { Fragment, useState } from 'react';
import styled from 'styled-components';

import { formatCurrency } from '../../utils/helpers';
import Button from '../../ui/Button';
import CreateEditCabinForm from './CreateEditCabinForm';
import useDeleteCabin from '../../hooks/useDeleteCabin';
import { HiMiniPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import useCreateCabin from '../../hooks/useCreateCabin';

const TableRow = styled.div`
    display: grid;
    grid-template-columns: 1.5fr 1.5fr 1.5fr 1.5fr 1fr 1fr;
    column-gap: 2.4rem;
    align-items: center;
    padding: 1.4rem 2.4rem;

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }
`;

const Img = styled.img`
    display: block;
    width: 6.4rem;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    object-position: center;
    transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: 'Sono';
`;

const Price = styled.div`
    font-family: 'Sono';
    font-weight: 600;
`;

const Discount = styled.div`
    font-family: 'Sono';
    font-weight: 500;
    color: var(--color-green-700);
`;

const CabinRow = ({ cabin }) => {
    const [showForm, setShowForm] = useState(false);
    const { isPending, mutate } = useDeleteCabin();
    const { addNewCabin, isAdding } = useCreateCabin();

    const handleShowForm = function () {
        setShowForm(true);
    };

    const handleDuplicate = function() {
        addNewCabin(
            { 
                name: `Copy of ${cabin.name}`,
                maxCapacity: cabin.maxCapacity,
                regularPrice: cabin.regularPrice,
                discount: cabin.discount,
                image: cabin.image,
                description: cabin.description,
            }
        )
    }

    return (
        <Fragment>
            <TableRow role="role">
                <Cabin>{cabin.name}</Cabin>
                <Img
                    src={
                        cabin.image
                            ? cabin.image
                            : 'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg'
                    }
                    alt={cabin.name}
                />
                <div>Fits up to {cabin.maxCapacity} quest</div>
                <Price>{formatCurrency(cabin.regularPrice)}</Price>
                <Discount>{formatCurrency(cabin.discount)}</Discount>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end' }}>
                    <Button onClick={handleDuplicate} disabled={isPending || isAdding} variation="success" size="small">
                        <HiSquare2Stack size={15} />
                    </Button>
                    <Button disabled={isPending} onClick={handleShowForm} variation="primary" size="small">
                        <HiMiniPencil size={15} />
                    </Button>
                    <Button disabled={isPending} onClick={() => mutate(cabin.id)} variation="danger" size="small">
                        <HiTrash size={15} />
                    </Button>
                </div>
            </TableRow>
            {showForm && <CreateEditCabinForm cabinToEdit={cabin} />}
        </Fragment>
    );
};

export default CabinRow;
