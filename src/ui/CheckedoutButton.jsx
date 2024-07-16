/* eslint-disable react/prop-types */
import { useCheckout } from '../hooks/useCheckout';
import Button from './Button';

const CheckedoutButton = ({ bookingId }) => {
    const { checkout, isCheckout  } = useCheckout()
    return (
        <Button disabled={isCheckout} onClick={() => checkout(bookingId)} size="small" variation="danger">Check out</Button>
    );
};

export default CheckedoutButton;