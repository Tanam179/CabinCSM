/* eslint-disable react/prop-types */
import styled from 'styled-components';

import { formatCurrency } from '../../utils/helpers';
import CreateEditCabinForm from './CreateEditCabinForm';
import useDeleteCabin from '../../hooks/useDeleteCabin';
import { HiMiniPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import useCreateCabin from '../../hooks/useCreateCabin';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';

// const TableRow = styled.div`
//     display: grid;
//     grid-template-columns: 1.5fr 1.5fr 1.5fr 1.5fr 1fr 1fr;
//     column-gap: 2.4rem;
//     align-items: center;
//     padding: 1.4rem 2.4rem;

//     &:not(:last-child) {
//         border-bottom: 1px solid var(--color-grey-100);
//     }
// `;

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
    const { isPending, mutate } = useDeleteCabin();
    const { addNewCabin } = useCreateCabin();

    const handleDuplicate = function () {
        addNewCabin({
            name: `Copy of ${cabin.name}`,
            maxCapacity: cabin.maxCapacity,
            regularPrice: cabin.regularPrice,
            discount: cabin.discount,
            image: cabin.image,
            description: cabin.description,
        });
    };

    return (
        <Table.Row role="role">
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
            <div>
                {/* <Modal>
                    <Modal.Open opens="edit-cabin">
                        <button disabled={isPending}>
                            <HiMiniPencil size={15} />
                        </button>
                    </Modal.Open>
                    <Modal.Window name="edit-cabin">
                        <CreateEditCabinForm cabinToEdit={cabin} />
                    </Modal.Window>

                    <Modal.Open opens="delete-cabin">
                        <button disabled={isPending}>
                            <HiTrash size={15} />
                        </button>
                    </Modal.Open>
                    <Modal.Window name="delete-cabin">
                        <ConfirmDelete
                            resourceName={`Cabin ${cabin.name}`}
                            disabled={isPending}
                            onConfirm={() => mutate(cabin.id)}
                        />
                    </Modal.Window>
                </Modal> */}
                <Menus.Menu>
                    <Modal>
                        <Menus.Toggle id={cabin.id}></Menus.Toggle>
                        <Menus.List id={cabin.id}>
                            <Menus.Button onClick={handleDuplicate} icon={<HiSquare2Stack size={15} />}>
                                Duplicate
                            </Menus.Button>

                            <Modal.Open opens="edit-cabin">
                                <Menus.Button icon={<HiMiniPencil size={15} />}>Edit</Menus.Button>
                            </Modal.Open>

                            <Modal.Open opens="delete-cabin">
                                <Menus.Button icon={<HiTrash size={15} />}>Delete</Menus.Button>
                            </Modal.Open>
                        </Menus.List>
                        <Modal.Window name="edit-cabin">
                            <CreateEditCabinForm cabinToEdit={cabin} />
                        </Modal.Window>
                        <Modal.Window name="delete-cabin">
                            <ConfirmDelete
                                resourceName={`Cabin ${cabin.name}`}
                                disabled={isPending}
                                onConfirm={() => mutate(cabin.id)}
                            />
                        </Modal.Window>
                    </Modal>
                </Menus.Menu>
            </div>
        </Table.Row>
    );
};

export default CabinRow;
