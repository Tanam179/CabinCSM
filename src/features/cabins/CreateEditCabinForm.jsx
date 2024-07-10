/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import Input from '../../ui/Input';
import FormRow from '../../ui/FormRow';
import useCreateCabin from '../../hooks/useCreateCabin';
import useUpdateCabin from '../../hooks/useUpdateCabin';

const ButtonRow = styled.div`
    display: flex;
    gap: 20px;
    margin-top: 2.5rem;
`;

const schema = yup
    .object()
    .shape({
        name: yup.string('Name must be string').required('Name is required'),
        maxCapacity: yup
            .number('Max capacity must be number')
            .positive('Max capacity must be a positive number')
            .integer('Max capacity must be a integer number')
            .required('Max capacity is required'),
        regularPrice: yup
            .number('Regular price must be number')
            .positive('Regular price must be a positive number')
            .integer('Regular price must be a integer number')
            .required('Regular price is required'),
        description: yup.string('Description must be string').required('Description is required'),
        discount: yup
            .number('Discount must be a number')
            .required('Discount is required')
            .test('less-than-regular-price', 'Discount must be less than regular price', function (value) {
                return value < this.parent.regularPrice;
            }),
        image: yup.mixed().test('fileRequired', 'Photo is required', (value) => {
            return typeof value === 'string' || (typeof value === 'object' && value.length > 0);
        }),
    })
    .required();

function CreateEditCabinForm({ cabinToEdit = {}, onClose }) {
    const [imagePreview, setImagePreview] = useState('');
    const { id: canbinEditID, ...cabinEditValues } = cabinToEdit;
    const { image: cabinEditImage } = cabinToEdit;

    const { addNewCabin, isAdding } = useCreateCabin();
    const { editCabin, isUpdating } = useUpdateCabin();

    const isLoading = isAdding || isUpdating;

    const isEditSession = Boolean(canbinEditID);

    const {
        register,
        handleSubmit,
        reset,
        resetField,
        getValues,
        setValue,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema), mode: 'all', defaultValues: isEditSession ? cabinEditValues : '' });

    useEffect(() => {
        if (isEditSession) {
            if (cabinEditImage) {
                setImagePreview(cabinEditImage);
            }
        }
    }, [isEditSession, cabinEditImage]);

    

    const onSubmit = (data) => {
        const image = typeof data.image === 'string' ? data.image : data.image[0];
        if (isEditSession) {
            editCabin({ newCabinData: { ...data, image }, id: canbinEditID }, { onSuccess: () => {setImagePreview(null); onClose()} });
        } else {
            addNewCabin({ ...data, image: image }, { onSuccess: () => reset()});
        }

    };

    const handleRemovePreivew = function () {
        if (imagePreview) {
            URL.revokeObjectURL(getValues().image[0]);
            setImagePreview(null);
            resetField('image');
            setValue('image', null);
        }
    };

    return (
        <Form type={onClose ? 'modal' : 'regular'} onSubmit={handleSubmit(onSubmit)}>
            <h2 style={{ color: 'var(--color-brand-600)', width: '100%' }}>
                {isEditSession ? `EDIT CABIN #${cabinToEdit.id}` : 'ADD NEW CABIN'}
            </h2>
            <FormRow size="half" label="Cabin name" errors={errors.name || undefined}>
                <Input disabled={isLoading} err={errors.name} type="text" id="name" {...register('name')} />
            </FormRow>
            <FormRow size="half" label="Maximum capacity" errors={errors.maxCapacity || undefined}>
                <Input
                    disabled={isLoading}
                    err={errors.maxCapacity}
                    defaultValue={0}
                    type="number"
                    id="maxCapacity"
                    {...register('maxCapacity')}
                />
            </FormRow>

            <FormRow size="half" label="Regular price" errors={errors.regularPrice || undefined}>
                <Input
                    disabled={isLoading}
                    err={errors.regularPrice}
                    type="number"
                    defaultValue={0}
                    id="regularPrice"
                    {...register('regularPrice')}
                />
            </FormRow>

            <FormRow size="half" label="discount" errors={errors.discount || undefined}>
                <Input
                    disabled={isLoading}
                    err={errors.discount}
                    type="number"
                    id="discount"
                    defaultValue={0}
                    {...register('discount')}
                />
            </FormRow>

            <FormRow size="full" label="Description for website" errors={errors.description || undefined}>
                <Textarea disabled={isLoading} id="description" defaultValue="" {...register('description')} />
            </FormRow>

            <FormRow size="full" label="Cabin photo" errors={errors?.image || null}>
                <FileInput
                    disabled={isLoading}
                    id="image"
                    type="file"
                    accept="image/*"
                    {...register('image')}
                    onChange={(e) => setImagePreview(URL.createObjectURL(e.target.files[0]))}
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <label
                        style={{
                            display: 'inline-block',
                            padding: '1.2rem 1.6rem',
                            cursor: 'pointer',
                            background: 'var(--color-brand-600)',
                            color: '#fff',
                            borderRadius: '5px',
                        }}
                        role="button"
                        htmlFor="image"
                        type="button"
                    >
                        Choose file
                    </label>
                    <span>
                        {imagePreview ? '1 file has been choosen' : 'No file choosen! Click button to choose new file'}
                    </span>
                </div>
                {imagePreview && (
                    <div style={{ position: 'relative' }}>
                        <img
                            src={imagePreview}
                            alt="preview"
                            style={{ width: 'auto', height: '100px', borderRadius: '8px' }}
                        />
                        <Button
                            onClick={handleRemovePreivew}
                            variation="danger"
                            size="small"
                            type="button"
                            style={{ position: 'absolute', top: '20px', right: '20px' }}
                        >
                            X
                        </Button>
                    </div>
                )}
            </FormRow>

            <ButtonRow>
                <Button onClick={onClose} variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button>{isEditSession ? 'Edit cabin' : 'Create new cabin'}</Button>
            </ButtonRow>
        </Form>
    );
}

export default CreateEditCabinForm;
