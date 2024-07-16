/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiEye, HiTrash } from 'react-icons/hi2';
import { format, isToday } from 'date-fns';

import Tag from '../../ui/Tag';
import Table from '../../ui/Table';
import { formatCurrency } from '../../utils/helpers';
import { formatDistanceFromNow } from '../../utils/helpers';
import Menus from '../../ui/Menus';
import { useCheckout } from '../../hooks/useCheckout';
import useDeleteBooking from '../../hooks/useDeleteBooking';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: 'Sono';
`;

const Stacked = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    & span:first-child {
        font-weight: 500;
    }

    & span:last-child {
        color: var(--color-grey-500);
        font-size: 1.2rem;
    }
`;

const Amount = styled.div`
    font-family: 'Sono';
    font-weight: 500;
`;

function BookingRow({
    booking: {
        id: bookingId,
        startDate,
        endDate,
        numNights,
        totalPrice,
        status,
        guests: { fullName: guestName, email },
        cabins: { name: cabinName },
    },
}) {
    const statusToTagName = {
        unconfirmed: 'blue',
        'checked-in': 'green',
        'checked-out': 'silver',
    };

    const { checkout } = useCheckout();
    const { mutate } = useDeleteBooking();

    const navigate = useNavigate();

    return (
        <Table.Row>
            <Cabin>{cabinName}</Cabin>

            <Stacked>
                <span>{guestName}</span>
                <span>{email}</span>
            </Stacked>

            <Stacked>
                <span>
                    {isToday(new Date(startDate)) ? 'Today' : formatDistanceFromNow(startDate)} &rarr; {numNights} night
                    stay
                </span>
                <span>
                    {format(new Date(startDate), 'MMM dd yyyy')} &mdash; {format(new Date(endDate), 'MMM dd yyyy')}
                </span>
            </Stacked>

            <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>

            <Amount>{formatCurrency(totalPrice)}</Amount>
            <Menus.Menu>
                <Modal>
                    <Menus.Toggle id={bookingId} />
                    <Menus.List id={bookingId}>
                        <Menus.Button icon={<HiEye size={15} />} onClick={() => navigate(`/bookings/${bookingId}`)}>
                            See details
                        </Menus.Button>
                        {status === 'unconfirmed' && (
                            <Menus.Button
                                icon={<HiArrowDownOnSquare size={15} />}
                                onClick={() => navigate(`/checkin/${bookingId}`)}
                            >
                                Check in
                            </Menus.Button>
                        )}
                        {status === 'checked-in' && (
                            <Menus.Button icon={<HiArrowUpOnSquare size={15} />} onClick={() => checkout(bookingId)}>
                                Check out
                            </Menus.Button>
                        )}
                        <Modal.Open opens="delete-booking">
                            <Menus.Button icon={<HiTrash size={15} />}>
                                Delete
                            </Menus.Button>
                        </Modal.Open>
                    </Menus.List>
                    <Modal.Window name="delete-booking">
                        <ConfirmDelete onConfirm={() => mutate(bookingId) } resourceName={`booking #${bookingId}`} />
                    </Modal.Window>
                </Modal>
            </Menus.Menu>
        </Table.Row>
    );
}

export default BookingRow;
