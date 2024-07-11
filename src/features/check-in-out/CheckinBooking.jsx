import { useEffect, useState } from 'react';
import styled from 'styled-components';
import BookingDataBox from '../../features/bookings/BookingDataBox';

import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';

import { useMoveBack } from '../../hooks/useMoveBack';
import useBooking from '../../hooks/useBooking';
import Spinner from '../../ui/Spinner';
import Checkbox from '../../ui/Checkbox';
import { formatCurrency } from '../../utils/helpers';
import { useCheckin } from '../../hooks/useCheckin';
import useSettings from '../../hooks/useSettings';

const Box = styled.div`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    padding: 2.4rem 4rem;
`;

function CheckinBooking() {
    const { booking, isLoading } = useBooking();
    const { settings } = useSettings();
    const [confirmPaid, setConfirmPaid] = useState(false);
    const [addBreakfast, setAddBreakfast] = useState(false);
    const { checkin, isCheckinIn } = useCheckin();

    useEffect(() => {
        setConfirmPaid(booking?.isPaid ?? false);
    }, [booking]);

    const moveBack = useMoveBack();

    if (isLoading) {
        return <Spinner />;
    }

    const handleChange = () => {
        setConfirmPaid((prev) => !prev);
    };

    const { id: bookingId, guests, totalPrice, numGuests, hasBreakfast, numNights } = booking;

    const handleCheckin = function () {
        if (!confirmPaid) return;
        if(addBreakfast) {
            checkin({ bookingId, breakfast: {
                hasBreakfast: true,
                extrasPrice: optionalBreakfastPrice,
                totalPrice: totalPrice + optionalBreakfastPrice,
            }})
        } else {
            checkin({bookingId, breakfast: {}});
        }
    };

    const optionalBreakfastPrice = settings?.breakfastPrice * numNights * numGuests;

    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Check in booking #{bookingId}</Heading>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            {!hasBreakfast && (
                <Box style={{ margin: '10px 0 10px 0' }}>
                    <Checkbox
                        checked={addBreakfast}
                        onChange={() => {
                            setAddBreakfast((prev) => !prev);
                            setConfirmPaid(false);
                        }}
                        id="breafast"
                    >
                        Want to add breakfast for {optionalBreakfastPrice}$
                    </Checkbox>
                </Box>
            )}

            <Box style={{ margin: '10px 0 30px 0' }}>
                <Checkbox
                    disabled={confirmPaid || isCheckinIn}
                    id="confirm"
                    checked={confirmPaid}
                    onChange={handleChange}
                >
                    I confirm that {guests.fullName} has paid the total amount of{' '}
                    {!addBreakfast
                        ? formatCurrency(totalPrice)
                        : `${formatCurrency(totalPrice + optionalBreakfastPrice)} (${formatCurrency(
                              totalPrice,
                          )} + ${formatCurrency(optionalBreakfastPrice)})})`}
                </Checkbox>
            </Box>

            <ButtonGroup>
                <Button disabled={!confirmPaid || isCheckinIn} onClick={handleCheckin}>
                    Check in booking #{bookingId}
                </Button>
                <Button variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default CheckinBooking;
