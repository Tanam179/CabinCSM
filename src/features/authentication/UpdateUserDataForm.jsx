import { useState } from 'react';

import useUser from '../../hooks/useUser';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import FileInput from '../../ui/FileInput';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import useUpdateUser from '../../hooks/useUpdateUser';
import { toast } from 'react-toastify';


function UpdateUserDataForm() {
    // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
    const {
        user: {
            email,
            user_metadata: { fullName: currentFullName },
        },
    } = useUser();

    const { isUpdating, updateUser } = useUpdateUser();

    const [fullName, setFullName] = useState(currentFullName);
    const [avatar, setAvatar] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();
        if(!fullName) return 
        
        updateUser({ fullName, avatar }, {
            onSuccess() {
                setAvatar(null);
            }
        })
    }

    const handleCancel = function() {
        setFullName(currentFullName);
        setAvatar(null);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormRow label="Email address">
                <Input value={email} disabled />
            </FormRow>
            <FormRow label="Full name">
                <Input disabled={isUpdating} type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} id="fullName" />
            </FormRow>
            <FormRow label="Avatar image">
                <FileInput disabled={isUpdating} id="avatar" accept="image/*" onChange={(e) => setAvatar(e.target.files[0])} />
            </FormRow>
            <FormRow>
                <Button onClick={handleCancel} disabled={isUpdating} type="reset" variation="secondary">
                    Cancel
                </Button>
                <Button disabled={isUpdating}>Update account</Button>
            </FormRow>
        </Form>
    );
}

export default UpdateUserDataForm;
