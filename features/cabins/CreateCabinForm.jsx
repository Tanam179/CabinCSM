import { useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import Input from '../../ui/Input';
import { createCabin } from '../../services/apiCabins';
import FormRow from '../../ui/FormRow';

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
        image: yup
            .mixed()
            .test('fileRequired', 'Image is required', (value) => {
                return value && (value instanceof FileList ? value.length > 0 : true);
            })
            .test('fileSize', 'The file is too large', (value) => {
                return value && value[0] && value[0].size <= 2000000; // Check if file size is less than 2MB
            })
            .test('fileType', 'Unsupported File Format', (value) => {
                return value && value[0] && ['image/jpeg', 'image/png', 'image/gif'].includes(value[0].type); // Check if file type is supported
            }),
    })
    .required();

function CreateCabinForm() {
    const {
        register,
        handleSubmit,
        reset,
        resetField,
        getValues,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const [imagePreview, setImagePreview] = useState('');

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createCabin,
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['cabins'] });
            resetForm();
            toast.success('Create cabin successfully!');
        },
        onError(err) {
            toast.error(`${err.message}`);
        },
    });

    const onSubmit = (data) => {
        console.log(data);
        mutation.mutate(data);
    };

    const resetForm = function () {
        reset();
    };

    const handleRemovePreivew = function () {
        URL.revokeObjectURL(getValues().image[0]);
        setImagePreview(null);
        resetField('image');
    };

    console.log(errors);

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow label="Cabin name" errors={errors.name || undefined}>
                <Input type="text" id="name" {...register('name')} />
            </FormRow>

            <FormRow label="Maximum capacity" errors={errors.maxCapacity || undefined}>
                <Input defaultValue={0} type="number" id="maxCapacity" {...register('maxCapacity')} />
            </FormRow>

            <FormRow label="Regular price" errors={errors.regularPrice || undefined}>
                <Input type="number" defaultValue={0} id="regularPrice" {...register('regularPrice')} />
            </FormRow>

            <FormRow label="discount" errors={errors.discount || undefined}>
                <Input type="number" id="discount" defaultValue={0} {...register('discount')} />
            </FormRow>

            <FormRow label="Description for website" errors={errors.description || undefined}>
                <Textarea id="description" defaultValue="" {...register('description')} />
            </FormRow>

            <FormRow label="Cabin photo" errors={errors?.image || null}>
                <FileInput
                    id="image"
                    type="file"
                    accept="image/*"
                    {...register('image')}
                    onChange={(e) => setImagePreview(URL.createObjectURL(e.target.files[0]))}
                    defaultValue={undefined}
                />
                {imagePreview && (
                    <div style={{ position: 'relative' }}>
                        <img src={imagePreview} alt="preview" style={{ width: '100%', height: 'auto' }} />
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
                <Button onClick={resetForm} variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button>Add cabin</Button>
            </ButtonRow>
        </Form>
    );
}

export default CreateCabinForm;
