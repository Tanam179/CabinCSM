/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { formatCurrency } from '../../utils/helpers';
import Button from '../../ui/Button';
import { deleteCabin } from '../../services/apiCabins';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

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
    //THIS USEQUERYCLIENT HOOK IS TO GET THE QUERYCLIENT INSTANCE FROM APP.JSX
    const queryClient = useQueryClient();
    const {isPending, mutate} = useMutation({
        mutationFn: deleteCabin,
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['cabins'] });
            toast.success('Delete cabin successfully!');
        },
        onError(err) {
            toast.error(`${err.message}`);
        },
        retry: 1
    })

    return (
        <TableRow role='role'>
            <Cabin>{cabin.name}</Cabin>
            <Img src={cabin.image ? cabin.image : 'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg'} alt={cabin.name} />
            <div>Fits up to {cabin.maxCapacity} quest</div>
            <Price>{formatCurrency(cabin.regularPrice)}</Price>
            <Discount>{ formatCurrency(cabin.discount) }</Discount>
            <Button disabled={ isPending } onClick={() => mutate(cabin.id)} variation='secondary' size="small">Delete</Button>
        </TableRow>
    );
};

export default CabinRow;