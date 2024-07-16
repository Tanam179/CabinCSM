import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';

import { useMoveBack } from '../../hooks/useMoveBack';
import useBooking from '../../hooks/useBooking';
import Spinner from '../../ui/Spinner';
import { useCheckout } from '../../hooks/useCheckout';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { HiTrash } from 'react-icons/hi2';
import useDeleteBooking from '../../hooks/useDeleteBooking';

const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
`;

function BookingDetail() {
    const { booking, isLoading } = useBooking();
    const { checkout } = useCheckout();
    const navigate = useNavigate();
    const moveBack = useMoveBack();
    const { mutate } = useDeleteBooking();

    const statusToTagName = {
        unconfirmed: 'blue',
        'checked-in': 'green',
        'checked-out': 'silver',
    };

    if (isLoading) {
        return <Spinner />;
    }

    const { status, id } = booking;

    return (
        <>
            <Row type="horizontal" style={{ marginBottom: 20 }}>
                <HeadingGroup>
                    <Heading as="h1">Booking #{id}</Heading>
                    <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
                </HeadingGroup>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            <ButtonGroup style={{ marginTop: 30 }}>
                <Modal>
                    {status === 'unconfirmed' && (
                        <Button onClick={() => navigate(`/checkin/${booking.id}`)}>Check in</Button>
                    )}
                    {status === 'checked-in' && <Button onClick={() => checkout(booking.id)}>Check out</Button>}
                    <Modal.Open opens="delete-booking">
                        <Button variation="danger" icon={<HiTrash size={15} />}>Delete booking</Button>
                    </Modal.Open>
                    <Modal.Window name="delete-booking">
                        <ConfirmDelete onConfirm={() => mutate(booking.id, { onSuccess: () => navigate('/bookings') })} resourceName={`booking #${booking.id}`} />
                    </Modal.Window>
                    <Button variation="secondary" onClick={moveBack}>
                        Back
                    </Button>
                </Modal>
            </ButtonGroup>
        </>
    );
}

export default BookingDetail;
