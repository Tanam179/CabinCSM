import styled from 'styled-components';
import Form from '../../ui/Form';

// import Input from '../../ui/Input';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import Input from '../../ui/Input';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const FormRow = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: 24rem 1fr 1.2fr;
    gap: 2.4rem;

    padding: 1.2rem 0;

    &:first-child {
        padding-top: 0;
    }

    &:last-child {
        padding-bottom: 0;
    }

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }

    &:has(button) {
        display: flex;
        justify-content: flex-end;
        gap: 1.2rem;
    }
`;

const Label = styled.label`
    font-weight: 500;
`;

// const Error = styled.span`
//     font-size: 1.4rem;
//     color: var(--color-red-700);
// `;

const schema = yup
    .object({
        name: yup.string('Name must be string').required('Name is required'),
        maxCapacity: yup
            .number('Max capacity must be number')
            .positive('Max capacity must be a positive number')
            .integer('Max capacity must be a integer number')
            .required('Max capacity is required'),
    })
    .required();

function CreateCabinForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema), mode: 'all' });

    const onSubmit = (data) => console.log(data);

    const resetForm = function() {
        reset();
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow>
                <Label htmlFor="name">Cabin name</Label>
                <Input type="text" id="name" {...register('name')}/>
                {errors.name && <p>{errors.name.message}</p>}
            </FormRow>

            <FormRow>
                <Label htmlFor="maxCapacity">Maximum capacity</Label>
                <Input type="number" id="maxCapacity" {...register('maxCapacity')}/>
                {errors.maxCapacity && <p>{errors.maxCapacity.message}</p>}
            </FormRow>

            <FormRow>
                <Label htmlFor="regularPrice">Regular price</Label>
                <Input type="number" id="regularPrice" {...register('regularPrice')} />
            </FormRow>

            <FormRow>
                <Label htmlFor="discount">Discount</Label>
                <Input type="number" id="discount" defaultValue={0} {...register('discount')} />
            </FormRow>

            <FormRow>
                <Label htmlFor="description">Description for website</Label>
                <Textarea type="number" id="description" defaultValue="" {...register('description')} />
            </FormRow>

            <FormRow>
                <Label htmlFor="image">Cabin photo</Label>
                <FileInput id="image" accept="image/*" {...register('image')} />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button onClick={resetForm} variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button>Edit cabin</Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm